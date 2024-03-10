import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRecentRoutingModule } from './library-recent-routing.module';
import { LibraryRecentComponent } from './library-recent.component';
import { SharedLibraryModule } from '../../shared/shared-library.module';
import { LibraryRecentListComponent } from './components/library-recent-list/library-recent-list.component';
import { UIModule } from '@simpler/ui';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LibraryRecentComponent, LibraryRecentListComponent],
  imports: [
    CommonModule,
    LibraryRecentRoutingModule,
    SharedLibraryModule,
    TranslateModule,
    UIModule,
  ],
})
export class LibraryRecentModule {}
