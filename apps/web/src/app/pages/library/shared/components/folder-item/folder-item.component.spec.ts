import { RouterTestingModule } from '@angular/router/testing';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { mockLibraryFolder } from '@simpler/testing';
import { IconComponent } from '@simpler/ui';
import { MockComponents, MockModule } from 'ng-mocks';

import { FolderItemComponent } from './folder-item.component';

describe('FolderItemComponent', () => {
  let spectator: Spectator<FolderItemComponent>;

  const createComponent = createComponentFactory({
    component: FolderItemComponent,
    declarations: [MockComponents(IconComponent)],
    imports: [MockModule(NgbTooltipModule), MockModule(RouterTestingModule)],
  });

  beforeEach(() => {
    spectator = createComponent({ props: { folder: mockLibraryFolder } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
