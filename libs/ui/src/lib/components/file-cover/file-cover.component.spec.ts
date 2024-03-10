import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { FileCoverComponent } from './file-cover.component';
import { StorageService } from '@simpler/api/storage';
import { MockComponent, MockProvider } from 'ng-mocks';
import { IconComponent } from '@simpler/ui';

describe('FileCoverComponent', () => {
  let spectator: Spectator<FileCoverComponent>;

  const createComponent = createComponentFactory({
    component: FileCoverComponent,
    declarations: [MockComponent(IconComponent)],
    providers: [MockProvider(StorageService)],
  });

  beforeEach(() => {
    spectator = createComponent({ props: { coverUrl: 'cover url' } });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
