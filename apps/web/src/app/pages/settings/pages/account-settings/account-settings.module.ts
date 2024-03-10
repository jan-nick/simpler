import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { AccountSettingsComponent } from './account-settings.component';
import { UIModule } from '@simpler/ui';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordConfirmDialogComponent } from './components/reset-password-confirm-dialog/reset-password-confirm-dialog.component';
import { ResetEmailConfirmDialogComponent } from './components/reset-email-confirm-dialog/reset-email-confirm-dialog.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    ResetPasswordConfirmDialogComponent,
    ResetEmailConfirmDialogComponent,
  ],
  imports: [
    AccountSettingsRoutingModule,
    CommonModule,
    FormsModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    TranslateModule,
    UIModule,
  ],
})
export class AccountSettingsModule {}
