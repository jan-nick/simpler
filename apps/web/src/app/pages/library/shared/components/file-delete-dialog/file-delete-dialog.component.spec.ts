import { FileDeleteDialogComponent } from './file-delete-dialog.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { MockComponents, MockProvider, MockProviders } from 'ng-mocks';
import { StorageService } from '@simpler/api/storage';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslatePipeMock } from '@simpler/testing';
import { ButtonComponent } from '@simpler/ui';

describe('FileDeleteDialogComponent', () => {
  let spectator: Spectator<FileDeleteDialogComponent>;

  const createComponent = createComponentFactory({
    component: FileDeleteDialogComponent,
    declarations: [MockComponents(ButtonComponent), TranslatePipeMock],
    imports: [],
    providers: [
      MockProviders(NgbActiveModal),
      MockProvider(StorageService, {
        getSignedUrl: jest.fn(() => of('signed-url')),
      }),
      provideMockStore(),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
