import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileDetailComponent } from './file-detail.component';

const routes: Routes = [{ path: ':id', component: FileDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileDetailRoutingModule {}
