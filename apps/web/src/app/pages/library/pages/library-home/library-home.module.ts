import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryHomeRoutingModule } from './library-home-routing.module';
import { LibraryHomeComponent } from './library-home.component';
import { SharedLibraryModule } from '../../shared/shared-library.module';
import { LibraryHomeFilesListComponent } from './components/library-home-files-list/library-home-files-list.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LibraryHomeComponent, LibraryHomeFilesListComponent],
  imports: [
    CommonModule,
    LibraryHomeRoutingModule,
    SharedLibraryModule,
    SharedLibraryModule,
    TranslateModule,
  ],
})
export class LibraryHomeModule {}
