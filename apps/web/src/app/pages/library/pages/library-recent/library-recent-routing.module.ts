import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryRecentComponent } from './library-recent.component';

const routes: Routes = [{ path: '', component: LibraryRecentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRecentRoutingModule {}
