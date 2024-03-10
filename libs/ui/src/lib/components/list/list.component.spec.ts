import { createHostFactory, Spectator } from '@ngneat/spectator/jest';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let spectator: Spectator<ListComponent>;
  let component: ListComponent;

  const createHost = createHostFactory({
    component: ListComponent,
  });

  beforeEach(() => {
    spectator = createHost(`<simpler-list></simpler-list>`);
    component = spectator.component;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
