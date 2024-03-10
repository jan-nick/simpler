import { AccountSettingsComponent } from './account-settings.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import {
  MockComponents,
  MockModule,
  MockProvider,
  MockProviders,
} from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '@simpler/api/storage';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { selectUser } from '@simpler/auth';
import { userMockFactory } from '@simpler/testing';
import {
  AvatarComponent,
  ButtonComponent,
  DividerComponent,
  InputComponent,
} from '@simpler/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AccountSettingsComponent', () => {
  let spectator: Spectator<AccountSettingsComponent>;

  const createComponent = createComponentFactory({
    component: AccountSettingsComponent,
    declarations: [
      MockComponents(
        AvatarComponent,
        ButtonComponent,
        DividerComponent,
        InputComponent
      ),
    ],
    imports: [
      FormsModule,
      ReactiveFormsModule,
      MockModule(NgbTooltipModule),
      MockModule(RouterTestingModule),
      MockModule(TranslateModule),
    ],
    providers: [
      MockProvider(StorageService, {
        getSignedUrl: jest.fn(() => of()),
      }),
      MockProviders(NgbModal, TranslateService),
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
