import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LibraryFile } from '@prisma/client';
import { StorageService } from '@simpler/api/storage';
import { selectUser } from '@simpler/auth';
import { LibraryFilePlayActions } from '@simpler/library-file-plays';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  of,
  skip,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import UUID from 'uuidjs';

export type AudioPlayerSettings = {
  volume: number;
};

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService {
  readonly audio = new Audio();
  private readonly defaultSettings: Readonly<AudioPlayerSettings> = {
    volume: 100,
  };

  private readonly queueSource = new BehaviorSubject<LibraryFile[]>([]);
  readonly queue$: Observable<LibraryFile[]> = this.queueSource.asObservable();

  private readonly activeFileSource = new BehaviorSubject<LibraryFile | null>(
    null
  );
  readonly activeFile$ = this.activeFileSource.asObservable();
  readonly activeFileQueueIndex$ = combineLatest([
    this.activeFile$,
    this.queue$,
  ]).pipe(
    map(([activeFile, queue]) =>
      queue.findIndex(({ id }) => id === activeFile?.id)
    )
  );
  readonly previousFile$ = combineLatest({
    index: this.activeFileQueueIndex$,
    queue: this.queue$,
  }).pipe(map(({ index, queue }) => queue[index - 1]));
  readonly nextFile$ = combineLatest({
    index: this.activeFileQueueIndex$,
    queue: this.queue$,
  }).pipe(map(({ index, queue }) => queue[index + 1]));

  private readonly mutedSource = new BehaviorSubject<boolean>(false);
  readonly muted$ = this.mutedSource.pipe(distinctUntilChanged());

  private readonly pausedSource = new BehaviorSubject<boolean>(false);
  readonly paused$ = this.pausedSource.pipe(distinctUntilChanged());

  private readonly volumeSource = new BehaviorSubject<number>(
    this.defaultSettings.volume
  );
  readonly volume$ = this.volumeSource.pipe(distinctUntilChanged());

  readonly currentTime$ = fromEvent(this.audio, 'timeupdate').pipe(
    map(() => this.audio.currentTime)
  );
  readonly duration$ = fromEvent(this.audio, 'durationchange').pipe(
    map(() => this.audio.duration)
  );

  readonly signedUrl$ = this.activeFile$.pipe(
    distinctUntilChanged((previous, current) => previous?.id === current?.id),
    switchMap((file) =>
      file?.url ? this.storageService.getSignedUrl(file.url) : of()
    )
  );

  readonly user$ = this.store.select(selectUser);

  private readonly destroyedSource = new Subject<boolean>();
  readonly destroyed$ = this.destroyedSource.asObservable();

  constructor(
    private readonly storageService: StorageService,
    private readonly store: Store
  ) {}

  init() {
    this.initSettings();
    this.initFileChangeEffects();
    this.initAudio();
  }

  destroy() {
    this.destroyedSource.next(true);
  }

  private initFileChangeEffects() {
    this.activeFile$
      .pipe(
        takeUntil(this.destroyed$),
        distinctUntilChanged(
          (previous, current) => previous?.id === current?.id
        ),
        switchMap((file) =>
          this.signedUrl$.pipe(map((signedUrl) => ({ file, signedUrl })))
        ),
        tap(({ file, signedUrl }) => {
          if (file && signedUrl) {
            this.loadAudioFile(signedUrl);
          }
        }),
        switchMap(({ file }) =>
          this.user$.pipe(map((currentUser) => ({ file, currentUser })))
        ),
        tap(({ file, currentUser }) => {
          if (file && currentUser && currentUser?.id !== file?.userId) {
            this.store.dispatch(
              LibraryFilePlayActions.addLibraryFilePlay({
                libraryFilePlay: {
                  id: UUID.generate(),
                  libraryFileId: file.id,
                  userId: currentUser.id,
                  playedAt: new Date(),
                },
              })
            );
          }
        })
      )
      .subscribe();
  }

  private initAudio() {
    this.audio.preload = 'auto';
    this.audio.onended = () => this.pause(true);
    // * Infintite loop, but need because of native OS player interactions
    // * this.audio.onpause = () => this.pause(true);
    // * this.audio.onplay = () => this.pause(false);
    // * this.audio.onvolumechange = () =>
    // *   this.setVolume(this.audio.volume);

    this.paused$
      .pipe(skip(1), takeUntil(this.destroyed$))
      .subscribe(async (paused) => {
        if (paused) {
          this.audio?.pause();
        } else {
          this.audio?.play();
        }
      });

    this.volume$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((volume) => (this.audio.volume = volume / 100));

    this.muted$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((muted) => (this.audio.muted = muted));
  }

  private loadAudioFile(url: string | undefined) {
    if (url) {
      this.audio.src = url;
      this.audio.currentTime = 0;
      this.audio.play();
    } else {
      // TODO: Error
    }
  }

  private initSettings() {
    const playerSettings: AudioPlayerSettings | null = JSON.parse(
      localStorage.getItem('audio-player') ?? 'null'
    );

    if (playerSettings) {
      this.setVolume(playerSettings.volume);
    } else {
      localStorage.setItem(
        'audio-player',
        JSON.stringify(this.defaultSettings)
      );
    }

    this.volume$.pipe(debounceTime(100)).subscribe((volume) => {
      const playerSettings = JSON.parse(
        localStorage.getItem('audio-player') ?? 'null'
      );

      if (playerSettings) {
        playerSettings.volume = volume;

        localStorage.setItem('audio-player', JSON.stringify(playerSettings));
      }
    });
  }

  setVolume(volume: number) {
    this.volumeSource.next(volume);
  }

  mute(mute = true) {
    this.mutedSource.next(mute);
  }

  toggleMute(mute?: boolean) {
    const muted = mute == null ? !this.mutedSource.value : mute;
    this.mutedSource.next(muted);
  }

  pause(paused = true) {
    this.pausedSource.next(paused);
  }

  resume(resume = true) {
    this.pausedSource.next(!resume);
  }

  play(options?: { file: LibraryFile; queue?: LibraryFile[] }) {
    if (options) {
      const { file, queue } = options;

      this.activeFileSource.next(file);

      if (queue) this.queueSource.next(queue);
    }

    this.resume();
  }

  setCurrentTime(currentTime: number) {
    this.audio.currentTime = currentTime;
  }

  setQueue(files: LibraryFile[]) {
    this.queueSource.next(files);
  }

  playNextInQueue() {
    this.nextFile$.pipe(take(1)).subscribe((nextFile) => {
      if (nextFile) this.play({ file: nextFile });
    });
  }

  playPreviousInQueue() {
    this.previousFile$.pipe(take(1)).subscribe((previousFile) => {
      if (previousFile) this.play({ file: previousFile });
    });
  }
}
