import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { SharedLibraryModule } from '../../shared/shared-library.module';
import { LibraryHomeFilesListComponent } from './components/library-home-files-list/library-home-files-list.component';
import { LibraryHomeComponent } from './library-home.component';

describe('LibraryHomeComponent', () => {
  let spectator: Spectator<LibraryHomeComponent>;
  let component: LibraryHomeComponent;

  const createComponent = createComponentFactory({
    component: LibraryHomeComponent,
    declarations: [MockComponent(LibraryHomeFilesListComponent)],
    imports: [
      MockModule(SharedLibraryModule),
      MockModule(TranslateModule),
      HttpClientTestingModule,
    ],
    providers: [MockProvider(TranslateService)],
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
