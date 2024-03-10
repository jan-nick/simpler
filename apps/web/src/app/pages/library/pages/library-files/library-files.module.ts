import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryFilesRoutingModule } from './library-files-routing.module';
import { LibraryFilesComponent } from './library-files.component';
import { SharedLibraryModule } from '../../shared/shared-library.module';
import { LibraryFilesPathBreadcrumbsComponent } from './components/library-files-path-breadcrumbs/library-files-path-breadcrumbs.component';
import { LibraryFilesListComponent } from './components/library-files-list/library-files-list.component';
import { UIModule } from '@simpler/ui';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LibraryFilesComponent,
    LibraryFilesListComponent,
    LibraryFilesPathBreadcrumbsComponent,
  ],
  imports: [
    CommonModule,
    LibraryFilesRoutingModule,
    NgbTooltipModule,
    SharedLibraryModule,
    UIModule,
    TranslateModule,
  ],
})
export class LibraryFilesModule {}
