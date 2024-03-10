import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let spectator: Spectator<SkeletonComponent>;

  const createComponent = createComponentFactory({
    component: SkeletonComponent,
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
});
