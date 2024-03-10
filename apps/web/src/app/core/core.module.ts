import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarLoggedInComponent } from './components/navbar/navbar-logged-in/navbar-logged-in.component';
import { NavbarLoggedOutComponent } from './components/navbar/navbar-logged-out/navbar-logged-out.component';
import { UIModule } from '@simpler/ui';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AudioPlayerCenterControlsComponent } from './components/audio-player/audio-player-center-controls/audio-player-center-controls.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { AudioPlayerLeftControlsComponent } from './components/audio-player/audio-player-left-controls/audio-player-left-controls.component';
import { AudioPlayerRightControlsComponent } from './components/audio-player/audio-player-right-controls/audio-player-right-controls.component';
import { EarlyAccessComponent } from './components/early-access/early-access.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AudioPlayerCenterControlsComponent,
    AudioPlayerComponent,
    AudioPlayerLeftControlsComponent,
    AudioPlayerRightControlsComponent,
    EarlyAccessComponent,
    NavbarComponent,
    NavbarLoggedInComponent,
    NavbarLoggedOutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    UIModule,
  ],
  exports: [AudioPlayerComponent, EarlyAccessComponent, NavbarComponent],
})
export class CoreModule {}
