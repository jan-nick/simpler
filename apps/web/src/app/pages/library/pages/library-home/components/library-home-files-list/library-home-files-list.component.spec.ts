import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockModule, MockProvider } from 'ng-mocks';

import { LibraryHomeFilesListComponent } from './library-home-files-list.component';
import { SharedLibraryModule } from '../../../../shared/shared-library.module';
import { LibraryHomeService } from '../../library-home.service';
import { AudioPlayerService } from '../../../../../../core/components/audio-player/audio-player.service';

describe('LibraryHomeFilesListComponent', () => {
  let spectator: Spectator<LibraryHomeFilesListComponent>;

  const createComponent = createComponentFactory({
    component: LibraryHomeFilesListComponent,
    imports: [MockModule(SharedLibraryModule), MockModule(TranslateModule)],
    providers: [
      MockProvider(AudioPlayerService),
      MockProvider(LibraryHomeService),
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
