import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryHomeComponent } from './library-home.component';

const routes: Routes = [{ path: '', component: LibraryHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryHomeRoutingModule {}
