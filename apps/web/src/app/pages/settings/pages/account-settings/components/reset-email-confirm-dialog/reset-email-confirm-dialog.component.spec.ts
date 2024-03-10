import { ResetEmailConfirmDialogComponent } from './reset-email-confirm-dialog.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponents, MockModule, MockProviders } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonComponent } from '@simpler/ui';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { provideMockStore } from '@ngrx/store/testing';
import { selectUser } from '@simpler/auth';
import { userMockFactory } from '@simpler/testing';

describe('ResetEmailConfirmDialogComponent', () => {
  let spectator: Spectator<ResetEmailConfirmDialogComponent>;

  const createComponent = createComponentFactory({
    component: ResetEmailConfirmDialogComponent,
    declarations: [MockComponents(ButtonComponent)],
    imports: [MockModule(RouterTestingModule), MockModule(TranslateModule)],
    providers: [
      MockProviders(NgbActiveModal, TranslateService),
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
