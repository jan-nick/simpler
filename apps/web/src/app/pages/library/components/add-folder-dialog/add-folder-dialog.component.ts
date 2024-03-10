import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { LibraryFolder } from '@prisma/client';
import {
  LibraryFolderActions,
  LibraryFolderState,
} from '@simpler/library-folders';
import { AuthState, selectUser } from '@simpler/auth';
import { firstValueFrom } from 'rxjs';
import UUID from 'uuidjs';

@Component({
  selector: 'simpler-add-folder-dialog',
  templateUrl: './add-folder-dialog.component.html',
  styleUrls: ['./add-folder-dialog.component.scss'],
})
export class AddFolderDialogComponent {
  @Input() parentFolder!: LibraryFolder;

  folderName = this.translateService.instant(
    'pages.library.addFolderDialog.folderNameInputDefaultValue'
  );

  constructor(
    private readonly ngbActiveModal: NgbActiveModal,
    private readonly store: Store<AuthState & LibraryFolderState>,
    private readonly translateService: TranslateService
  ) {}

  close() {
    this.ngbActiveModal.close();
  }

  async save() {
    const user = await firstValueFrom(this.store.select(selectUser));

    if (!this.folderName || !user?.id) return;

    this.store.dispatch(
      LibraryFolderActions.addLibraryFolder({
        libraryFolder: {
          id: UUID.generate(),
          userId: user.id,
          parentId: this.parentFolder?.id ?? null,
          name: this.folderName,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    );

    this.close();
  }
}
