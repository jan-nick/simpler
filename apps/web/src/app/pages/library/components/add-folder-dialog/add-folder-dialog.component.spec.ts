import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockComponents, MockModule, MockProviders } from 'ng-mocks';

import { AddFolderDialogComponent } from './add-folder-dialog.component';
import { ButtonComponent, InputComponent } from '@simpler/ui';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { selectUser } from '@simpler/auth';
import { userMockFactory } from '@simpler/testing';

describe('AddFolderDialogComponent', () => {
  let spectator: Spectator<AddFolderDialogComponent>;

  const createComponent = createComponentFactory({
    component: AddFolderDialogComponent,
    declarations: [MockComponents(ButtonComponent, InputComponent)],
    imports: [MockModule(FormsModule), MockModule(TranslateModule)],
    providers: [
      MockProviders(NgbActiveModal, Store, TranslateService),
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
