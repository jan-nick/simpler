import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailConfirmSuccessComponent } from './email-confirm-success.component';

const routes: Routes = [{ path: '', component: EmailConfirmSuccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailConfirmSuccessRoutingModule {}
