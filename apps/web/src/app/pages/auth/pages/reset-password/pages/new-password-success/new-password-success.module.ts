import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewPasswordSuccessRoutingModule } from './new-password-success-routing.module';
import { NewPasswordSuccessComponent } from './new-password-success.component';
import { UIModule } from '@simpler/ui';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NewPasswordSuccessComponent],
  imports: [
    CommonModule,
    NewPasswordSuccessRoutingModule,
    TranslateModule,
    UIModule,
  ],
})
export class NewPasswordSuccessModule {}
