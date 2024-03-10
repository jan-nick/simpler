import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { DividerComponent } from './divider.component';

describe('DividerComponent', () => {
  let spectator: Spectator<DividerComponent>;
  let component: DividerComponent;

  let containerElement: HTMLButtonElement | null;

  const createComponent = createComponentFactory({
    component: DividerComponent,
    imports: [],
    providers: [],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    containerElement = spectator.query('.simpler-divider');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set size to large by default', () => {
    expect(component.size).toBe('small');
  });

  it('should add a css class for each size type', () => {
    component.size = 'large';
    spectator.detectChanges();

    expect(containerElement?.classList).toContain('simpler-divider-large');

    component.size = 'small';
    spectator.detectChanges();

    expect(containerElement?.classList).toContain('simpler-divider-small');
  });

  it('should set direction to large by default', () => {
    expect(component.direction).toBe('horizontal');
  });

  it('should add a css class for each direction type', () => {
    component.direction = 'vertical';
    spectator.detectChanges();

    expect(containerElement?.classList).toContain('simpler-divider-vertical');

    component.direction = 'horizontal';
    spectator.detectChanges();

    expect(containerElement?.classList).toContain('simpler-divider-horizontal');
  });
});
