import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileDetailRoutingModule } from './file-detail-routing.module';
import { FileDetailComponent } from './file-detail.component';
import { UIModule } from '@simpler/ui';
import { FileDetailAudioPlayerComponent } from './components/file-detail-audio-player/file-detail-audio-player.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AudioPlayerWaveformComponent } from './components/audio-player-waveform/audio-player-waveform.component';
import { LibraryFilePlayComponent } from '../../shared/components/file-play-count/library-file-play.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    FileDetailComponent,
    FileDetailAudioPlayerComponent,
    AudioPlayerWaveformComponent,
  ],
  imports: [
    CommonModule,
    FileDetailRoutingModule,
    NgbTooltipModule,
    LibraryFilePlayComponent,
    SharedModule,
    TranslateModule,
    UIModule,
  ],
})
export class FileDetailModule {}
