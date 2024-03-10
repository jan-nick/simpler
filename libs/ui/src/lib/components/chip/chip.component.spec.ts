import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { MockComponents } from 'ng-mocks';
import { IconComponent } from '../icon/icon.component';

import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
  let spectator: Spectator<ChipComponent>;
  let component: ChipComponent;

  let containerElement: HTMLDivElement | null;

  const createComponent = createComponentFactory({
    component: ChipComponent,
    declarations: [MockComponents(IconComponent)],
    providers: [],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    containerElement = spectator.query('.simpler-chip');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set icon', () => {
    component.icon = 'x';
    component.iconPosition = 'left';
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-chip-icon-left');

    component.iconPosition = 'right';
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-chip-icon-right');
  });

  it('should set color to primary by default', () => {
    expect(component.color).toBe('primary');
  });

  it('should add a css class for each color type', () => {
    component.color = 'secondary';
    spectator.detectChanges();

    expect(containerElement?.classList).toContain('simpler-chip-secondary');

    component.color = 'danger';
    spectator.detectChanges();

    expect(containerElement?.classList).toContain('simpler-chip-danger');
  });
});
