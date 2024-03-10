import { FileDetailComponent } from './file-detail.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponent, MockModule, MockProviders } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { selectUser } from '@simpler/auth';
import { userMockFactory } from '@simpler/testing';
import { FileDetailAudioPlayerComponent } from './components/file-detail-audio-player/file-detail-audio-player.component';

describe('FileDetailComponent', () => {
  let spectator: Spectator<FileDetailComponent>;

  const createComponent = createComponentFactory({
    component: FileDetailComponent,
    declarations: [MockComponent(FileDetailAudioPlayerComponent)],
    imports: [
      HttpClientTestingModule,
      MockModule(RouterTestingModule),
      MockModule(TranslateModule),
    ],
    providers: [
      MockProviders(TranslateService),
      provideMockStore({
        selectors: [{ selector: selectUser, value: userMockFactory() }],
      }),
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
