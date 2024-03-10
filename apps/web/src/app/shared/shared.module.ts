import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileLinkButtonComponent } from './components/file-link-button/file-link-button.component';
import { FileShareButtonComponent } from './components/file-share-button/file-share-button.component';
import { FileShareDialogComponent } from './components/file-share-dialog/file-share-dialog.component';
import { UIModule } from '@simpler/ui';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileDownloadButtonComponent } from './components/file-download-button/file-download-button.component';

@NgModule({
  declarations: [
    FileLinkButtonComponent,
    FileShareButtonComponent,
    FileShareDialogComponent,
    FileDownloadButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    TranslateModule,
    UIModule,
  ],
  exports: [
    FileLinkButtonComponent,
    FileShareButtonComponent,
    FileShareDialogComponent,
    FileDownloadButtonComponent,
  ],
})
export class SharedModule {}
