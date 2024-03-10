import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule } from '@ngx-translate/core';
import { MockComponents, MockModule, MockProvider } from 'ng-mocks';

import { LibrarySidenavComponent } from './library-sidenav.component';
import { StorageService } from '@simpler/api/storage';
import { LibraryUploadService } from '../../services/library-upload.service';
import { of } from 'rxjs';
import {
  ButtonComponent,
  DividerComponent,
  ListComponent,
  NavButtonComponent,
  ProgressBarComponent,
  SidenavComponent,
  SkeletonComponent,
} from '@simpler/ui';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

describe('LibrarySidenavComponent', () => {
  let spectator: Spectator<LibrarySidenavComponent>;

  const createComponent = createComponentFactory({
    component: LibrarySidenavComponent,
    declarations: [
      MockComponents(
        ButtonComponent,
        DividerComponent,
        ListComponent,
        NavButtonComponent,
        ProgressBarComponent,
        SidenavComponent,
        SkeletonComponent
      ),
    ],
    imports: [MockModule(NgbTooltipModule), MockModule(TranslateModule)],
    providers: [
      MockProvider(LibraryUploadService, {
        userStorage$: of(10_485_760), //
        totalProgress$: of(0.5),
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

  it('should initialize maxUserStorage', () => {
    expect(spectator.component.maxUserStorage).toBe('10GB');
  });

  it('should initialize userStorage$', (done) => {
    spectator.component.userStorage$.subscribe((userStorage) => {
      expect(userStorage).toBe('10MB');

      done();
    });
  });

  it('should initialize storageProgress$', (done) => {
    spectator.component.storageProgress$.subscribe((storageProgress) => {
      expect(storageProgress).toBeCloseTo(0.1);

      done();
    });
  });

  it('should initialize uploadProgress$', (done) => {
    spectator.component.uploadProgress$.subscribe((uploadProgress) => {
      expect(uploadProgress).toBeCloseTo(0.5);

      done();
    });
  });
});
