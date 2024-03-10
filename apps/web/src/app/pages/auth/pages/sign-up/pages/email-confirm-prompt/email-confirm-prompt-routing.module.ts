import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailConfirmPromptComponent } from './email-confirm-prompt.component';

const routes: Routes = [{ path: '', component: EmailConfirmPromptComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailConfirmPromptRoutingModule { }
