import { NgModule } from '@angular/core';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';
import { AddFolderDialogComponent } from './components/add-folder-dialog/add-folder-dialog.component';
import { CompletedFileUploadsComponent } from './components/file-upload-modal/completed-file-uploads/completed-file-uploads.component';
import { CompletedUploadItemComponent } from './components/file-upload-modal/completed-upload-item/completed-upload-item.component';
import { FileUploadModalComponent } from './components/file-upload-modal/file-upload-modal.component';
import { LibrarySidenavComponent } from './components/library-sidenav/library-sidenav.component';
import { NewFileUploadsComponent } from './components/file-upload-modal/new-file-uploads/new-file-uploads.component';
import { UploadAreaComponent } from './components/upload-area/upload-area.component';
import { UploadItemComponent } from './components/file-upload-modal/upload-item/upload-item.component';
import { UIModule } from '@simpler/ui';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { DateFnsModule } from 'ngx-date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedLibraryModule } from './shared/shared-library.module';

@NgModule({
  declarations: [
    AddFolderDialogComponent,
    CompletedFileUploadsComponent,
    CompletedUploadItemComponent,
    FileUploadModalComponent,
    LibraryComponent,
    LibrarySidenavComponent,
    NewFileUploadsComponent,
    UploadAreaComponent,
    UploadItemComponent,
  ],
  imports: [
    CommonModule,
    DateFnsModule,
    FormsModule,
    LibraryRoutingModule,
    NgbModule,
    TranslateModule,
    UIModule,
    SharedLibraryModule,
  ],
})
export class LibraryModule {}
