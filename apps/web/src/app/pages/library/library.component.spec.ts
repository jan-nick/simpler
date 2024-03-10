import { LibraryComponent } from './library.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedLibraryModule } from './shared/shared-library.module';
import { LibrarySidenavComponent } from './components/library-sidenav/library-sidenav.component';
import { AudioPlayerComponent } from '../../core/components/audio-player/audio-player.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('LibraryComponent', () => {
  let spectator: Spectator<LibraryComponent>;

  const createComponent = createComponentFactory({
    component: LibraryComponent,
    declarations: [
      MockComponent(AudioPlayerComponent),
      MockComponent(LibrarySidenavComponent),
    ],
    imports: [
      MockModule(RouterTestingModule),
      MockModule(SharedLibraryModule),
      MockModule(TranslateModule),
    ],
    providers: [MockProvider(TranslateService), provideMockStore()],
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
