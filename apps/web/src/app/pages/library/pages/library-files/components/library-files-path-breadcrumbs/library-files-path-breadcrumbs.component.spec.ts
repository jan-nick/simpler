import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponents, MockModule, MockProvider } from 'ng-mocks';

import { LibraryFilesPathBreadcrumbsComponent } from './library-files-path-breadcrumbs.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LibraryFilesService } from '../../library-files.service';
import { BreadcrumbGroupComponent } from '@simpler/ui';

describe('LibraryFilesPathBreadcrumbsComponent', () => {
  let spectator: Spectator<LibraryFilesPathBreadcrumbsComponent>;

  const createComponent = createComponentFactory({
    component: LibraryFilesPathBreadcrumbsComponent,
    declarations: [MockComponents(BreadcrumbGroupComponent)],
    imports: [MockModule(TranslateModule)],
    providers: [
      MockProvider(LibraryFilesService),
      MockProvider(TranslateService),
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
