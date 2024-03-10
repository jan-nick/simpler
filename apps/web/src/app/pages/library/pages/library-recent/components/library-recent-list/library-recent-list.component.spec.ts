import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponents, MockProvider } from 'ng-mocks';

import { LibraryRecentListComponent } from './library-recent-list.component';
import { AudioPlayerService } from '../../../../../../core/components/audio-player/audio-player.service';
import { LibraryRecentService } from '../../library-recent.service';
import { ListComponent } from '@simpler/ui';

describe('LibraryRecentListComponent', () => {
  let spectator: Spectator<LibraryRecentListComponent>;
  let component: LibraryRecentListComponent;

  const createComponent = createComponentFactory({
    component: LibraryRecentListComponent,
    imports: [],
    declarations: [MockComponents(ListComponent)],
    providers: [
      MockProvider(AudioPlayerService),
      MockProvider(LibraryRecentService),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
