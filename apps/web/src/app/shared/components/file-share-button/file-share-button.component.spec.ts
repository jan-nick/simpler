import { FileShareButtonComponent } from './file-share-button.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import {
  MockComponents,
  MockModule,
  MockProvider,
  MockProviders,
} from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '@simpler/api/storage';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { selectUser } from '@simpler/auth';
import { userMockFactory } from '@simpler/testing';
import { IconButtonComponent } from '@simpler/ui';

describe('FileShareButtonComponent', () => {
  let spectator: Spectator<FileShareButtonComponent>;

  const createComponent = createComponentFactory({
    component: FileShareButtonComponent,
    declarations: [MockComponents(IconButtonComponent)],
    imports: [MockModule(NgbTooltipModule), MockModule(TranslateModule)],
    providers: [
      MockProvider(StorageService, {
        getSignedUrl: jest.fn(() => of()),
      }),
      MockProviders(TranslateService),
      provideMockStore({
        selectors: [
          {
            selector: selectUser,
            value: userMockFactory(),
          },
        ],
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
