import { BreadCrumbComponent } from './breadcrumb.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';
import { IconComponent } from '../icon/icon.component';

describe('BreadCrumbComponent', () => {
  let spectator: Spectator<BreadCrumbComponent>;

  const createComponent = createComponentFactory({
    component: BreadCrumbComponent,
    declarations: [MockComponents(IconComponent)],
    providers: [],
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

  it('should remove ability to focus host (tabIndex = "-1")', () => {
    expect(spectator.component['tabIndex']).toBe('-1');
  });
});
