import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewPasswordRoutingModule } from './new-password-routing.module';
import { NewPasswordComponent } from './new-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UIModule } from '@simpler/ui';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NewPasswordComponent],
  imports: [
    CommonModule,
    NewPasswordRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    UIModule,
  ],
})
export class NewPasswordModule {}
