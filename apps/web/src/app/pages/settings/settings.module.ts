import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SettingsSidenavComponent } from './components/settings-sidenav/settings-sidenav.component';
import { UIModule } from '@simpler/ui';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SettingsComponent, SettingsSidenavComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TranslateModule,
    UIModule,
  ],
})
export class SettingsModule {}
