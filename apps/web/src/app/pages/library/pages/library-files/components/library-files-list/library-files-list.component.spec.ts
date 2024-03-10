import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockComponents, MockModule, MockProvider } from 'ng-mocks';

import { LibraryFilesListComponent } from './library-files-list.component';
import { AudioPlayerService } from '../../../../../../core/components/audio-player/audio-player.service';
import { LibraryFilesService } from '../../library-files.service';
import { ListComponent } from '@simpler/ui';

describe('LibraryFilesListComponent', () => {
  let spectator: Spectator<LibraryFilesListComponent>;

  const createComponent = createComponentFactory({
    component: LibraryFilesListComponent,
    declarations: MockComponents(ListComponent),
    imports: [MockModule(TranslateModule)],
    providers: [
      MockProvider(AudioPlayerService),
      MockProvider(LibraryFilesService),
      MockProvider(TranslateService),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
