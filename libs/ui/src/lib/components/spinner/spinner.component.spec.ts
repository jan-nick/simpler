import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let spectator: Spectator<SpinnerComponent>;
  let component: SpinnerComponent;

  let containerElement: HTMLDivElement | null;

  const createComponent = createComponentFactory({
    component: SpinnerComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    containerElement = spectator.query('.simpler-spinner');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a css class for each color type including variants', () => {
    component.color = 'secondary';
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-spinner-secondary');

    component.color = 'danger-light';
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-spinner-danger-light');
  });

  it('should add a css class for each size type', () => {
    component.size = 'large';
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-spinner-large');

    component.size = 'small';
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-spinner-small');
  });
});
