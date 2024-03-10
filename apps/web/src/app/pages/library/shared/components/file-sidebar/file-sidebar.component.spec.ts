import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';
import { StorageService } from '@simpler/api/storage';
import { selectUser } from '@simpler/auth';
import { userMockFactory, mockLibraryFile } from '@simpler/testing';
import { MockProvider, MockProviders } from 'ng-mocks';
import { of } from 'rxjs';
import { AudioPlayerService } from '../../../../../core/components/audio-player/audio-player.service';

import { FileSidebarComponent } from './file-sidebar.component';

describe('FileSidebarComponent', () => {
  let spectator: Spectator<FileSidebarComponent>;

  const createComponent = createComponentFactory({
    component: FileSidebarComponent,
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [
      MockProviders(AudioPlayerService, NgbActiveOffcanvas, NgbOffcanvas),
      MockProvider(StorageService, {
        getSignedUrl: jest.fn(() => of('signed-url')),
      }),
      provideMockStore({
        initialState: {
          libraryFile: {
            entities: { [mockLibraryFile.id]: mockLibraryFile },
          },
        },
        selectors: [{ selector: selectUser, value: userMockFactory() }],
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
