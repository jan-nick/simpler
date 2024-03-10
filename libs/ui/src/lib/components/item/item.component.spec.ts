import { createHostFactory, Spectator } from '@ngneat/spectator/jest';
import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let spectator: Spectator<ItemComponent>;
  let component: ItemComponent;

  const createHost = createHostFactory({
    component: ItemComponent,
  });

  beforeEach(() => {
    spectator = createHost(`<simpler-item></simpler-item>`);
    component = spectator.component;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
