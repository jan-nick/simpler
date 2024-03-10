import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPasswordSuccessComponent } from './new-password-success.component';

const routes: Routes = [{ path: '', component: NewPasswordSuccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPasswordSuccessRoutingModule { }
