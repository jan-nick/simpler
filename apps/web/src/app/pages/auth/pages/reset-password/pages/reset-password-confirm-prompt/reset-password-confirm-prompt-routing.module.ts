import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordConfirmPromptComponent } from './reset-password-confirm-prompt.component';

const routes: Routes = [
  { path: '', component: ResetPasswordConfirmPromptComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordConfirmPromptRoutingModule {}
