import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailConfirmSuccessRoutingModule } from './email-confirm-success-routing.module';
import { EmailConfirmSuccessComponent } from './email-confirm-success.component';
import { UIModule } from '@simpler/ui';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EmailConfirmSuccessComponent],
  imports: [
    CommonModule,
    EmailConfirmSuccessRoutingModule,
    TranslateModule,
    UIModule,
  ],
})
export class EmailConfirmSuccessModule {}
