import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule } from '@ngx-translate/core';
import { MockComponents, MockModule, MockProvider } from 'ng-mocks';

import { LibraryRecentComponent } from './library-recent.component';
import { SharedLibraryModule } from '../../shared/shared-library.module';
import { LibraryRecentListComponent } from './components/library-recent-list/library-recent-list.component';
import { LibraryRecentService } from './library-recent.service';
import { ListComponent } from '@simpler/ui';

describe('LibraryRecentComponent', () => {
  let spectator: Spectator<LibraryRecentComponent>;

  const createComponent = createComponentFactory({
    component: LibraryRecentComponent,
    declarations: [MockComponents(LibraryRecentListComponent, ListComponent)],
    imports: [MockModule(SharedLibraryModule), MockModule(TranslateModule)],
    providers: [MockProvider(LibraryRecentService)],
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
