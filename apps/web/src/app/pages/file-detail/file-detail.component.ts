import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { getRouterSelectors } from '@ngrx/router-store';
import { Store, select } from '@ngrx/store';
import { StorageService } from '@simpler/api/storage';
import { selectUser } from '@simpler/auth';
import {
  LibraryFileActions,
  selectLibraryFileById,
  selectLoadLibraryFileLoading,
} from '@simpler/library-files';
import {
  UserActions,
  selectLoadUserLoading,
  selectUserById,
} from '@simpler/users';
import { combineLatest, map, mergeMap, of, switchMap, tap } from 'rxjs';
import {
  LibraryFilePlayActions,
  selectlibraryFilePlaysByLibraryFileId,
} from '@simpler/library-file-plays';

const { selectRouteParam } = getRouterSelectors();

@UntilDestroy()
@Component({
  selector: 'simpler-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.scss'],
})
export class FileDetailComponent {
  readonly file$ = this.store.pipe(
    select(selectRouteParam('id')),
    mergeMap((id) => {
      if (!id) return of(null);

      return this.store.pipe(
        untilDestroyed(this),
        selectLibraryFileById(id),
        tap((file) => {
          if (!file) {
            this.store.dispatch(LibraryFileActions.loadLibraryFile({ id }));
          }
        })
      );
    })
  );
  readonly owner$ = this.file$.pipe(
    mergeMap((file) =>
      file
        ? this.store.pipe(
            untilDestroyed(this),
            selectUserById(file.userId),
            tap((owner) => {
              if (!owner) {
                this.store.dispatch(UserActions.loadUser({ id: file.userId }));
              }
            })
          )
        : of(null)
    )
  );
  readonly signedCoverUrl$ = this.file$.pipe(
    switchMap((file) =>
      file?.coverUrl
        ? this.storageService
            .getSignedUrl(file.coverUrl)
            .pipe(untilDestroyed(this))
        : of()
    )
  );
  readonly libraryFilePlays$ = this.file$.pipe(
    switchMap((file) => {
      if (!file) return of(null);

      return this.store.pipe(
        untilDestroyed(this),
        selectlibraryFilePlaysByLibraryFileId(file.id),
        tap((libraryFilePlays) => {
          if (!libraryFilePlays?.length) {
            this.store.dispatch(
              LibraryFilePlayActions.loadLibraryFilePlays({
                args: { where: { libraryFileId: file.id } },
              })
            );
          }
        })
      );
    })
  );
  readonly user$ = this.store.select(selectUser);

  readonly loading$ = combineLatest([
    this.store.select(selectLoadLibraryFileLoading),
    this.store.select(selectLoadUserLoading),
  ]).pipe(map((loading) => loading.includes(true)));

  constructor(
    private readonly storageService: StorageService,
    private readonly store: Store
  ) {}
}
