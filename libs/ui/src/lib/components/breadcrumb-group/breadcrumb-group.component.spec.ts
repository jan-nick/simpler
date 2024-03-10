import { createHostFactory, Spectator } from '@ngneat/spectator/jest';
import { BreadcrumbGroupComponent } from './breadcrumb-group.component';

describe('BreadcrumbGroupComponent', () => {
  let spectator: Spectator<BreadcrumbGroupComponent>;
  let component: BreadcrumbGroupComponent;

  const createHost = createHostFactory({
    component: BreadcrumbGroupComponent,
  });

  beforeEach(() => {
    spectator = createHost(
      `<simpler-breadcrumb-group></simpler-breadcrumb-group>`
    );
    component = spectator.component;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
