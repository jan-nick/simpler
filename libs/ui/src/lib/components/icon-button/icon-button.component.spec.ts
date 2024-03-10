import { IconButtonComponent } from './icon-button.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { SpinnerComponent } from '../spinner/spinner.component';
import { IconComponent } from '../icon/icon.component';
import { MockComponents } from 'ng-mocks';

describe('IconButtonComponent', () => {
  let spectator: Spectator<IconButtonComponent>;
  let component: IconButtonComponent;

  let buttonElement: HTMLButtonElement | null;
  let spinner: SpinnerComponent | null;
  let icon: IconComponent | null;

  const createComponent = createComponentFactory({
    component: IconButtonComponent,
    declarations: [MockComponents(IconComponent, SpinnerComponent)],
    providers: [],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    buttonElement = spectator.query('button');
    spinner = spectator.query(SpinnerComponent);
    icon = spectator.query(IconComponent);
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

  it('should add and remove the disabled state', () => {
    expect(component.disabled).toBe(false);
    expect(buttonElement?.disabled).toBe(false);
    expect(buttonElement).not.toHaveClass('simpler-icon-button-disabled');

    component.disabled = true;
    spectator.detectChanges();

    expect(component.disabled).toBe(true);
    expect(buttonElement?.disabled).toBe(true);
    expect(buttonElement).toHaveClass('simpler-icon-button-disabled');

    component.disabled = false;
    spectator.detectChanges();

    expect(component.disabled).toBe(false);
    expect(buttonElement?.disabled).toBe(false);
    expect(buttonElement).not.toHaveClass('simpler-icon-button-disabled');
  });

  it('should add a css class simpler-icon-button-loading', () => {
    expect(component.loading).toBe(false);
    expect(buttonElement).not.toHaveClass('simpler-icon-button-loading');

    component.loading = true;
    spectator.detectChanges();

    expect(component.loading).toBe(true);
    expect(buttonElement).toHaveClass('simpler-icon-button-loading');

    component.loading = false;
    spectator.detectChanges();

    expect(component.loading).toBe(false);
    expect(buttonElement).not.toHaveClass('simpler-icon-button-loading');
  });

  it('should add spinner when loading', () => {
    component.loading = true;
    spectator.detectChanges();

    spinner = spectator.query(SpinnerComponent);

    expect(spinner).toBeTruthy();

    component.loading = false;
    spectator.detectChanges();

    spinner = spectator.query(SpinnerComponent);

    expect(spinner).toBeFalsy();
  });

  it('should hide icon when loading', () => {
    component.loading = true;
    spectator.detectChanges();

    icon = spectator.query(IconComponent);

    expect(icon).toBeFalsy();

    component.loading = false;
    spectator.detectChanges();

    icon = spectator.query(IconComponent);

    expect(icon).toBeTruthy();
  });

  it('should set type to button by default', () => {
    expect(buttonElement?.type).toBe('button');
  });

  it('should forward type to button element', () => {
    component.type = 'reset';
    spectator.detectChanges();

    expect(buttonElement?.type).toBe('reset');
  });

  it('should forward icon to name of icon', () => {
    component.icon = 'activity';
    spectator.detectChanges();

    expect(icon?.name).toBe('activity');
  });

  it('should forward size `large` as `medium` to size of icon', () => {
    component.size = 'large';
    spectator.detectChanges();

    expect(icon?.size).toBe('medium');
  });

  it('should forward size `small` as `small` to size of icon', () => {
    component.size = 'small';
    spectator.detectChanges();

    expect(icon?.size).toBe('small');
  });

  describe('button style', () => {
    it('should set color to primary by default', () => {
      expect(component.color).toBe('primary');
    });

    it('should add a css class for each color type', () => {
      component.color = 'secondary';
      spectator.detectChanges();

      expect(buttonElement).toHaveClass('simpler-icon-button-secondary');

      component.color = 'danger';
      spectator.detectChanges();

      expect(buttonElement).toHaveClass('simpler-icon-button-danger');
    });

    it('should set appearance to solid by default', () => {
      expect(component.appearance).toBe('solid');
    });

    it('should add a css class for each appearance type', () => {
      component.appearance = 'outline';
      spectator.detectChanges();

      expect(buttonElement).toHaveClass('simpler-icon-button-outline');

      component.appearance = 'transparent';
      spectator.detectChanges();

      expect(buttonElement).toHaveClass('simpler-icon-button-transparent');
    });

    it('should set size to large by default', () => {
      expect(component.size).toBe('large');
    });

    it('should add a css class for each size type', () => {
      component.size = 'large';
      spectator.detectChanges();

      expect(buttonElement).toHaveClass('simpler-icon-button-large');

      component.size = 'small';
      spectator.detectChanges();

      expect(buttonElement).toHaveClass('simpler-icon-button-small');
    });
  });
});
