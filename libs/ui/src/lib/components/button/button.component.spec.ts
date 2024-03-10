import { ButtonComponent } from './button.component';

import { Spectator } from '@ngneat/spectator';
import { createHostFactory } from '@ngneat/spectator/jest';
import { SpinnerComponent } from '../spinner/spinner.component';
import { IconComponent } from '../icon/icon.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { MockModule } from 'ng-mocks';

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent>;
  let component: ButtonComponent;

  let buttonElement: HTMLButtonElement | null;
  let buttonTextElement: HTMLSpanElement | null;
  let buttonSpinner: Element | null;
  let buttonIcon: IconComponent | null;

  const createHost = createHostFactory({
    component: ButtonComponent,
    declarations: [IconComponent, SpinnerComponent],
    imports: [MockModule(NgxBootstrapIconsModule)],
    providers: [],
  });

  beforeEach(() => {
    spectator = createHost(`<simpler-button>Button Text</simpler-button>`);
    component = spectator.component;

    buttonElement = spectator.query('.simpler-button');
    buttonTextElement = spectator.query('.simpler-button-text');
    buttonSpinner = spectator.query('simpler-spinner');
    buttonIcon = spectator.query(IconComponent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove ability to focus host (tabIndex = "-1")', () => {
    expect(component['tabIndex']).toBe('-1');
  });

  it('should set disabled', () => {
    expect(component.disabled).toBe(false);
    expect(buttonElement?.disabled).toBe(false);
    expect(buttonElement?.classList).not.toContain('simpler-button-disabled');

    component.disabled = true;
    spectator.detectChanges();

    expect(component.disabled).toBe(true);
    expect(buttonElement?.disabled).toBe(true);
    expect(buttonElement?.classList).toContain('simpler-button-disabled');

    component.disabled = false;
    spectator.detectChanges();

    expect(component.disabled).toBe(false);
    expect(buttonElement?.disabled).toBe(false);
    expect(buttonElement?.classList).not.toContain('simpler-button-disabled');
  });

  describe('loading', () => {
    beforeEach(() => {
      spectator.setInput({ loading: true });
      spectator.detectChanges();
    });

    it('should add css class simpler-button-loading to button element', () => {
      expect(buttonElement).toHaveClass('simpler-button-loading');

      spectator.setInput({ loading: false });

      expect(buttonElement).not.toHaveClass('simpler-button-loading');
    });

    it('should hide text', () => {
      buttonTextElement = spectator.query('.simpler-button-text');

      expect(buttonTextElement).toBeFalsy();

      spectator.setInput({ loading: false });

      buttonTextElement = spectator.query('.simpler-button-text');

      expect(buttonTextElement).toBeTruthy();
    });

    it('should hide icon', () => {
      component.icon = 'activity';
      spectator.detectChanges();

      buttonIcon = spectator.query(IconComponent);

      expect(buttonIcon).toBeFalsy();

      spectator.setInput({ loading: false });

      buttonIcon = spectator.query(IconComponent);

      expect(buttonIcon).toBeTruthy();
    });

    it('should show spinner', () => {
      buttonSpinner = spectator.query('simpler-spinner');

      expect(buttonSpinner).toBeTruthy();

      spectator.setInput({ loading: false });

      buttonSpinner = spectator.query('simpler-spinner');

      expect(buttonSpinner).toBeFalsy();
    });
  });

  it('should set type to button by default', () => {
    expect(buttonElement?.type).toBe('button');
  });

  it('should forward type to button element', () => {
    component.type = 'reset';
    spectator.detectChanges();

    expect(buttonElement?.type).toBe('reset');
  });

  describe('icon', () => {
    beforeEach(() => {
      component.icon = 'activity';
      spectator.detectChanges();
    });
    it('should forward icon to name of icon', () => {
      const icon = spectator.query(IconComponent);

      expect(icon?.name).toBe('activity');
    });

    it('should add css class simpler-button-icon', () => {
      buttonElement = spectator.query('.simpler-button');

      expect(buttonElement).toHaveClass('simpler-button-icon');
    });

    it('should add css class for icon position', () => {
      component.iconPosition = 'left';
      spectator.detectChanges();

      buttonElement = spectator.query('.simpler-button');

      expect(buttonElement).toHaveClass('simpler-button-icon-left');

      component.iconPosition = 'right';
      spectator.detectChanges();

      buttonElement = spectator.query('.simpler-button');

      expect(buttonElement).toHaveClass('simpler-button-icon-right');
    });
  });

  describe('button style', () => {
    it('should set color to primary by default', () => {
      expect(component.color).toBe('primary');
    });

    it('should add a css class for each color type', () => {
      component.color = 'secondary';
      spectator.detectChanges();

      expect(buttonElement).toHaveClass('simpler-button-secondary');

      component.color = 'danger';
      spectator.detectChanges();

      expect(buttonElement).toHaveClass('simpler-button-danger');
    });

    it('should set appearance to solid by default', () => {
      expect(component.appearance).toBe('solid');
    });

    it('should add a css class for each appearance type', () => {
      component.appearance = 'outline';
      spectator.detectChanges();

      expect(buttonElement).toHaveClass('simpler-button-outline');

      component.appearance = 'transparent';
      spectator.detectChanges();

      expect(buttonElement).toHaveClass('simpler-button-transparent');
    });
  });
});
