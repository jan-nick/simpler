import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryFilesComponent } from './library-files.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryFilesComponent,
  },
  { path: ':id', component: LibraryFilesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryFilesRoutingModule {}
