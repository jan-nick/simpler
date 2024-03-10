import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponents, MockProvider } from 'ng-mocks';

import { CompletedFileUploadsComponent } from './completed-file-uploads.component';
import { CompletedUploadItemComponent } from '../completed-upload-item/completed-upload-item.component';
import { ListComponent } from '@simpler/ui';
import { LibraryUploadService } from '../../../services/library-upload.service';

describe('CompletedFileUploadsComponent', () => {
  let spectator: Spectator<CompletedFileUploadsComponent>;
  let component: CompletedFileUploadsComponent;

  const createComponent = createComponentFactory({
    component: CompletedFileUploadsComponent,
    declarations: [MockComponents(CompletedUploadItemComponent, ListComponent)],
    providers: [MockProvider(LibraryUploadService)],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
