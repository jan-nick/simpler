import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  map,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { AddFolderDialogComponent } from '../../components/add-folder-dialog/add-folder-dialog.component';
import { RootFolder } from '../../models/types/root-folder.type';
import { LibraryFoldersService } from '@simpler/api/library-folders';
import { Store } from '@ngrx/store';
import { getRouterSelectors } from '@ngrx/router-store';
import { AuthState, selectUser } from '@simpler/auth';
import {
  LibraryFileActions,
  LibraryFileState,
  selectAllLibraryFiles,
  selectLoadLibraryFilesError,
  selectLoadLibraryFilesLoading,
} from '@simpler/library-files';
import {
  LibraryFolderActions,
  selectAllLibraryFolders,
  selectLibraryFolderById,
  selectLoadLibraryFoldersError,
  selectLoadLibraryFoldersLoading,
} from '@simpler/library-folders';

const { selectRouteParam } = getRouterSelectors();

/*
 TODO: Should be refactored to a store long-term
*/
@Injectable({
  providedIn: 'root',
})
export class LibraryFilesService {
  private readonly userId$ = this.store.select(selectUser).pipe(
    filter((user) => !!user),
    map((user) => user?.id as string)
  );

  readonly filesLimit = 15;
  readonly rootFolder: RootFolder = {
    id: null,
    name: this.translateService.instant(
      'pages.library.libraryFiles.rootFolderName'
    ),
  };

  readonly activeFolderId$ = this.store.select(selectRouteParam('id')).pipe(
    map((id) => id || null),
    distinctUntilChanged(),
    tap((id) => this.loadActiveFolderData(id)),
    shareReplay(1)
  );
  readonly activeFolder$ = this.activeFolderId$.pipe(
    switchMap((id) =>
      id
        ? this.store.pipe(
            selectLibraryFolderById(id),
            switchMap((folder) =>
              folder ? of(folder) : this.libraryFoldersService.findOne(id)
            )
          )
        : of(this.rootFolder)
    ),
    shareReplay(1)
  );
  readonly files$ = combineLatest([
    this.userId$,
    this.activeFolderId$,
    this.store.select(selectAllLibraryFiles),
  ]).pipe(
    map(([userId, activeFolderId, libraryFiles]) => {
      return libraryFiles
        .filter(
          (libraryFile) =>
            libraryFile.userId === userId &&
            libraryFile.libraryFolderId == activeFolderId
        )
        .sort((a, b) => a.name.localeCompare(b.name));
    })
  );
  readonly folders$ = combineLatest([
    this.userId$,
    this.activeFolderId$,
    this.store.select(selectAllLibraryFolders),
  ]).pipe(
    map(([userId, activeFolderId, libraryFolders]) => {
      return libraryFolders
        .filter(
          (libraryFolder) =>
            libraryFolder.userId === userId &&
            libraryFolder.parentId == activeFolderId
        )
        .sort((a, b) => a.name.localeCompare(b.name));
    })
  );
  readonly treeFolders$ = this.activeFolderId$.pipe(
    switchMap((activeFolderId) =>
      activeFolderId
        ? this.libraryFoldersService.findAllInPath(activeFolderId)
        : of([])
    ),
    map((folders) => [this.rootFolder, ...folders.reverse()]),
    tap({
      subscribe: () => this.loadingTreeFoldersSource.next(true),
      next: () => this.loadingTreeFoldersSource.next(false),
      error: () => this.loadingTreeFoldersSource.next(false),
    }),
    shareReplay(1)
  );

  readonly loadingFiles$ = this.store.select(selectLoadLibraryFilesLoading);
  readonly loadingFolders$ = this.store.select(selectLoadLibraryFoldersLoading);
  private readonly loadingTreeFoldersSource = new BehaviorSubject<boolean>(
    false
  );
  readonly loadingTreeFolders$ = this.loadingTreeFoldersSource.pipe();

  readonly loading$ = combineLatest([
    this.loadingFiles$,
    this.loadingFolders$,
    this.loadingTreeFolders$,
  ]).pipe(
    map((values) => values.some((value) => value)),
    distinctUntilChanged()
  );

  readonly error$ = combineLatest([
    this.store.select(selectLoadLibraryFilesError),
    this.store.select(selectLoadLibraryFoldersError),
  ]).pipe(
    map((errors) => errors.some((error) => !!error)),
    distinctUntilChanged()
  );

  constructor(
    private readonly libraryFoldersService: LibraryFoldersService,
    private readonly ngbModal: NgbModal,
    private readonly store: Store<AuthState & LibraryFileState>,
    private readonly translateService: TranslateService
  ) {}

  async openAddFolderDialog() {
    const activeFolder = await firstValueFrom(this.activeFolder$);
    const modalRef = this.ngbModal.open(AddFolderDialogComponent);
    modalRef.componentInstance.parentFolder = activeFolder;
  }

  private loadActiveFolderData(activeFolderId?: string | null) {
    this.loadFiles(activeFolderId);
    this.loadFolders(activeFolderId);
  }

  private async loadFiles(activeFolderId?: string | null) {
    const userId = await firstValueFrom(this.userId$);

    this.store.dispatch(
      LibraryFileActions.loadLibraryFiles({
        args: {
          where: {
            userId,
            libraryFolderId: activeFolderId ?? null,
          },
          orderBy: { name: 'asc' },
        },
      })
    );
  }

  private async loadFolders(activeFolderId?: string | null) {
    const userId = await firstValueFrom(this.userId$);

    this.store.dispatch(
      LibraryFolderActions.loadLibraryFolders({
        args: {
          where: {
            userId,
            parentId: activeFolderId ?? null,
          },
          orderBy: { name: 'asc' },
        },
      })
    );
  }
}
