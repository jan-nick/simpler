import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileItemComponent } from './components/file-item/file-item.component';
import { FolderItemComponent } from './components/folder-item/folder-item.component';
import { RouterModule } from '@angular/router';
import { FileCardComponent } from './components/file-card/file-card.component';
import { UIModule } from '@simpler/ui';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { DateFnsModule } from 'ngx-date-fns';
import { FileSidebarComponent } from './components/file-sidebar/file-sidebar.component';
import { FileDeleteDialogComponent } from './components/file-delete-dialog/file-delete-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    FileItemComponent,
    FileCardComponent,
    FileSidebarComponent,
    FolderItemComponent,
    FileDeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    DateFnsModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    TranslateModule,
    UIModule,
  ],
  exports: [
    FileItemComponent,
    FileCardComponent,
    FileSidebarComponent,
    FolderItemComponent,
    FileDeleteDialogComponent,
  ],
})
export class SharedLibraryModule {}
