import { ResetPasswordConfirmDialogComponent } from './reset-password-confirm-dialog.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import {
  MockComponents,
  MockModule,
  MockProvider,
  MockProviders,
} from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonComponent } from '@simpler/ui';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { provideMockStore } from '@ngrx/store/testing';
import { selectUser } from '@simpler/auth';
import { userMockFactory } from '@simpler/testing';

describe('ResetPasswordConfirmDialogComponent', () => {
  let spectator: Spectator<ResetPasswordConfirmDialogComponent>;

  const createComponent = createComponentFactory({
    component: ResetPasswordConfirmDialogComponent,
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
