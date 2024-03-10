import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule } from '@ngx-translate/core';
import { mockLibraryFile } from '@simpler/testing';
import { MockComponents, MockModule, MockProvider } from 'ng-mocks';
import { DateFnsModule } from 'ngx-date-fns';

import { FileCardComponent } from './file-card.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FileCoverComponent, IconComponent } from '@simpler/ui';
import { RouterTestingModule } from '@angular/router/testing';
import { AudioPlayerService } from '../../../../../core/components/audio-player/audio-player.service';

describe('FileCardComponent', () => {
  let spectator: Spectator<FileCardComponent>;

  const createComponent = createComponentFactory({
    component: FileCardComponent,
    declarations: [MockComponents(FileCoverComponent, IconComponent)],
    imports: [
      MockModule(DateFnsModule),
      MockModule(NgbTooltipModule),
      MockModule(TranslateModule),
      RouterTestingModule,
    ],
    providers: [MockProvider(AudioPlayerService)],
  });

  beforeEach(() => {
    spectator = createComponent({ props: { file: mockLibraryFile } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
