import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockComponents, MockModule, MockProvider } from 'ng-mocks';

import { FileUploadModalComponent } from './file-upload-modal.component';
import { NewFileUploadsComponent } from './new-file-uploads/new-file-uploads.component';
import { CompletedFileUploadsComponent } from './completed-file-uploads/completed-file-uploads.component';
import { ButtonComponent, TabComponent, TabGroupComponent } from '@simpler/ui';

describe('FileUploadModalComponent', () => {
  let spectator: Spectator<FileUploadModalComponent>;

  const createComponent = createComponentFactory({
    component: FileUploadModalComponent,
    declarations: [
      MockComponents(
        ButtonComponent,
        CompletedFileUploadsComponent,
        NewFileUploadsComponent,
        TabComponent,
        TabGroupComponent
      ),
    ],
    imports: [MockModule(TranslateModule)],
    providers: [MockProvider(NgbActiveModal), MockProvider(TranslateService)],
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
