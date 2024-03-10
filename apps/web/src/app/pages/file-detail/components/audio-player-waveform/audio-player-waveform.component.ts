import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AudioPlayerService } from '../../../../core/components/audio-player/audio-player.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, filter, first, map, of } from 'rxjs';
import { LibraryFile } from '@prisma/client';
import { StorageService } from '@simpler/api/storage';

import WaveSurfer from 'wavesurfer.js';

@UntilDestroy()
@Component({
  selector: 'simpler-audio-player-waveform',
  templateUrl: './audio-player-waveform.component.html',
  styleUrls: ['./audio-player-waveform.component.scss'],
})
export class AudioPlayerWaveformComponent implements OnInit, OnDestroy {
  @Input() file: LibraryFile | undefined | null;

  waveform: WaveSurfer | undefined;
  loadingWaveformAudio = false;

  duration: number | undefined | null;
  currentTime: number | undefined | null;

  isActive$ = of(false);

  constructor(
    private readonly audioPlayerService: AudioPlayerService,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.isActive$ = this.audioPlayerService.activeFile$.pipe(
      untilDestroyed(this),
      map((activeFile) => !!activeFile && activeFile.id === this.file?.id)
    );

    this.createWaveform();
    this.initAudioPlayer();
  }

  ngOnDestroy(): void {
    this.waveform?.destroy();
  }

  createWaveform() {
    this.waveform = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#727175b8',
      progressColor: '#b18fef',
      cursorWidth: 0,
      height: 56,
      hideScrollbar: true,
    });
    this.loadingWaveformAudio = true;
  }

  initAudioPlayer() {
    if (this.file) {
      this.storageService
        .getSignedUrl(this.file?.url)
        .subscribe((signedUrl) => {
          this.waveform?.load(signedUrl);
        });
    }

    // mute and only display waveform
    // AudioPlayerService handles audio
    this.waveform?.setMuted(true);

    combineLatest({
      isActive: this.isActive$,
      paused: this.audioPlayerService.paused$,
    })
      .pipe(
        untilDestroyed(this),
        filter(({ isActive }) => !!isActive)
      )
      .subscribe(({ paused }) => {
        if (paused) {
          this.waveform?.pause();
        } else {
          this.waveform?.play();
        }
      });

    combineLatest({
      isActive: this.isActive$,
      currentTime: this.audioPlayerService.currentTime$,
    })
      .pipe(
        untilDestroyed(this),
        filter(({ isActive }) => !!isActive)
      )
      .subscribe(({ currentTime }) => {
        this.waveform?.setTime(currentTime);
      });

    this.waveform?.on('ready', () => {
      this.loadingWaveformAudio = false;
      this.duration = this.waveform?.getDuration();
    });

    this.waveform?.on('click', () => {
      this.currentTime = this.waveform?.getCurrentTime();

      this.isActive$
        .pipe(
          first(),
          filter((isActive) => !!isActive)
        )
        .subscribe(() => {
          if (this.currentTime) {
            this.audioPlayerService.setCurrentTime(this.currentTime);
          }
        });
    });
  }
}
