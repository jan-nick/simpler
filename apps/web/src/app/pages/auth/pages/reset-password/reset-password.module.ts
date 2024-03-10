import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordConfirmPromptComponent } from './pages/reset-password-confirm-prompt/reset-password-confirm-prompt.component';
import { UIModule } from '@simpler/ui';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ResetPasswordComponent, ResetPasswordConfirmPromptComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    UIModule,
  ],
})
export class ResetPasswordModule {}
