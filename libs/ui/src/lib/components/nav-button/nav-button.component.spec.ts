import { NavButtonComponent } from './nav-button.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponents, MockModule } from 'ng-mocks';
import { IconComponent } from '../icon/icon.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerComponent } from '../spinner/spinner.component';

describe('NavButtonComponent', () => {
  let spectator: Spectator<NavButtonComponent>;
  let component: NavButtonComponent;

  let buttonElement: HTMLButtonElement | null;
  let textElement: HTMLSpanElement | null;
  let spinnerElement: Element | null;
  let iconElement: Element | null;
  let caretElement: Element | null;

  const createComponent = createComponentFactory({
    component: NavButtonComponent,
    declarations: [MockComponents(IconComponent, SpinnerComponent)],
    imports: [MockModule(RouterTestingModule)],
    providers: [],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    buttonElement = spectator.query('button.simpler-nav-button');
    textElement = spectator.query('.simpler-nav-button-text');
    spinnerElement = spectator.query('simpler-spinner');
    iconElement = spectator.query('simpler-icon.simpler-nav-button-icon');
    caretElement = spectator.query('simpler-icon.simpler-nav-button-caret');
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

  it('should set disabled', () => {
    expect(component.disabled).toBe(false);
    expect(buttonElement?.disabled).toBe(false);
    expect(buttonElement).not.toHaveClass('simpler-nav-button-is-disabled');

    component.disabled = true;
    spectator.detectChanges();

    expect(component.disabled).toBe(true);
    expect(buttonElement?.disabled).toBe(true);
    expect(buttonElement).toHaveClass('simpler-nav-button-is-disabled');

    component.disabled = false;
    spectator.detectChanges();

    expect(component.disabled).toBe(false);
    expect(buttonElement?.disabled).toBe(false);
    expect(buttonElement).not.toHaveClass('simpler-nav-button-is-disabled');
  });

  describe('loading', () => {
    beforeEach(() => {
      spectator.setInput({ loading: true });
      spectator.detectChanges();
    });

    it('should add css class', () => {
      expect(buttonElement).toHaveClass('simpler-nav-button-is-loading');

      spectator.setInput({ loading: false });

      expect(buttonElement).not.toHaveClass('simpler-nav-button-is-loading');
    });

    it('should hide text', () => {
      textElement = spectator.query('.simpler-nav-button-text');

      expect(textElement).toBeFalsy();

      spectator.setInput({ loading: false });

      textElement = spectator.query('.simpler-nav-button-text');

      expect(textElement).toBeTruthy();
    });

    it('should hide icon', () => {
      component.icon = 'activity';
      spectator.detectChanges();

      iconElement = spectator.query('simpler-icon.simpler-nav-button-icon');

      expect(iconElement).toBeFalsy();

      spectator.setInput({ loading: false });

      iconElement = spectator.query('simpler-icon.simpler-nav-button-icon');

      expect(iconElement).toBeTruthy();
    });

    it('should hide caret', () => {
      component.caret = true;
      spectator.detectChanges();

      caretElement = spectator.query('simpler-icon.simpler-nav-button-caret');

      expect(caretElement).toBeFalsy();

      spectator.setInput({ loading: false });

      caretElement = spectator.query('simpler-icon.simpler-nav-button-caret');

      expect(caretElement).toBeTruthy();
    });

    it('should show spinner', () => {
      spinnerElement = spectator.query('simpler-spinner');

      expect(spinnerElement).toBeTruthy();

      spectator.setInput({ loading: false });

      spinnerElement = spectator.query('simpler-spinner');

      expect(spinnerElement).toBeFalsy();
    });
  });

  it('should set type to button', () => {
    expect(buttonElement).toHaveAttribute('type', 'button');
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

    it('should add css class', () => {
      buttonElement = spectator.query('button.simpler-nav-button');

      expect(buttonElement).toHaveClass('simpler-nav-button-has-icon');
    });
  });

  it('should set caret', () => {
    caretElement = spectator.query('simpler-icon.simpler-nav-button-caret');

    expect(component.caret).toBe(false);
    expect(caretElement).toBeFalsy();
    expect(buttonElement).not.toHaveClass('simpler-nav-button-has-caret');

    component.caret = true;
    spectator.detectChanges();

    caretElement = spectator.query('simpler-icon.simpler-nav-button-caret');

    expect(component.caret).toBe(true);
    expect(caretElement).toBeTruthy();
    expect(buttonElement).toHaveClass('simpler-nav-button-has-caret');

    component.caret = false;
    spectator.detectChanges();

    caretElement = spectator.query('simpler-icon.simpler-nav-button-caret');

    expect(component.caret).toBe(false);
    expect(caretElement).toBeFalsy();
    expect(buttonElement).not.toHaveClass('simpler-nav-button-has-caret');
  });
});
