import { FileShareDialogComponent } from './file-share-dialog.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import {
  MockComponents,
  MockModule,
  MockProvider,
  MockProviders,
} from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgbActiveModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { provideMockStore } from '@ngrx/store/testing';
import { selectUser } from '@simpler/auth';
import { mockLibraryFile, userMockFactory } from '@simpler/testing';
import {
  ButtonComponent,
  IconButtonComponent,
  ToggleComponent,
} from '@simpler/ui';
import { FileLinkButtonComponent } from '../file-link-button/file-link-button.component';

describe('FileShareDialogComponent', () => {
  let spectator: Spectator<FileShareDialogComponent>;

  const createComponent = createComponentFactory({
    component: FileShareDialogComponent,
    declarations: [
      MockComponents(
        ButtonComponent,
        FileLinkButtonComponent,
        IconButtonComponent,
        ToggleComponent
      ),
    ],
    imports: [MockModule(NgbTooltipModule), MockModule(TranslateModule)],
    providers: [
      MockProvider(NgbActiveModal, {
        close: jest.fn(),
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
    spectator = createComponent({ props: { libraryFile: mockLibraryFile } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
