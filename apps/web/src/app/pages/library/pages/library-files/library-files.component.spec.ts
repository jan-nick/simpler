import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockComponents, MockModule, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { LibraryFilesPathBreadcrumbsComponent } from './components/library-files-path-breadcrumbs/library-files-path-breadcrumbs.component';
import { LibraryFilesComponent } from './library-files.component';
import { LibraryFilesListComponent } from './components/library-files-list/library-files-list.component';
import { LibraryFilesService } from './library-files.service';
import { IconButtonComponent } from '@simpler/ui';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

describe('LibraryFilesComponent', () => {
  let spectator: Spectator<LibraryFilesComponent>;
  let component: LibraryFilesComponent;

  const createComponent = createComponentFactory({
    component: LibraryFilesComponent,
    declarations: [
      MockComponents(
        IconButtonComponent,
        LibraryFilesListComponent,
        LibraryFilesPathBreadcrumbsComponent
      ),
    ],
    imports: [
      MockModule(NgbTooltipModule),
      MockModule(TranslateModule),
      MockModule(RouterTestingModule),
    ],
    providers: [
      MockProvider(ActivatedRoute, { params: of({ id: 'some id' }) }),
      MockProvider(LibraryFilesService),
      MockProvider(TranslateService),
    ],
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
