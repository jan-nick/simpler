import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/library-home/library-home.module').then(
            (m) => m.LibraryHomeModule
          ),
      },
      {
        path: 'files',
        loadChildren: () =>
          import('./pages/library-files/library-files.module').then(
            (m) => m.LibraryFilesModule
          ),
      },
      {
        path: 'recent',
        loadChildren: () =>
          import('./pages/library-recent/library-recent.module').then(
            (m) => m.LibraryRecentModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  bootstrap: [LibraryComponent],
})
export class LibraryRoutingModule {}
