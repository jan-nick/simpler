import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailConfirmPromptRoutingModule } from './email-confirm-prompt-routing.module';
import { EmailConfirmPromptComponent } from './email-confirm-prompt.component';
import { UIModule } from '@simpler/ui';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EmailConfirmPromptComponent],
  imports: [
    CommonModule,
    EmailConfirmPromptRoutingModule,
    TranslateModule,
    UIModule,
  ],
})
export class EmailConfirmPromptModule {}
