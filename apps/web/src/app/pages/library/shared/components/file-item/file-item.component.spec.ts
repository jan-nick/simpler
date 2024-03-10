import { RouterTestingModule } from '@angular/router/testing';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { mockLibraryFile, TranslatePipeMock } from '@simpler/testing';
import {
  FileCoverComponent,
  IconButtonComponent,
  IconComponent,
  ItemComponent,
  SkeletonComponent,
} from '@simpler/ui';
import { MockComponents, MockModule, MockProvider } from 'ng-mocks';

import { FileItemComponent } from './file-item.component';
import { AudioPlayerService } from '../../../../../core/components/audio-player/audio-player.service';

describe('FileItemComponent', () => {
  let spectator: Spectator<FileItemComponent>;

  const createComponent = createComponentFactory({
    component: FileItemComponent,
    declarations: [
      MockComponents(
        FileCoverComponent,
        IconButtonComponent,
        IconComponent,
        ItemComponent,
        SkeletonComponent
      ),
      TranslatePipeMock,
    ],
    imports: [MockModule(NgbTooltipModule), RouterTestingModule],
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
