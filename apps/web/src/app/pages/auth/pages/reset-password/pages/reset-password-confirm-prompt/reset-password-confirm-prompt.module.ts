import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordConfirmPromptRoutingModule } from './reset-password-confirm-prompt-routing.module';
import { UIModule } from '@simpler/ui';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ResetPasswordConfirmPromptRoutingModule,
    TranslateModule,
    UIModule,
  ],
})
export class ResetPasswordConfirmPromptModule {}
