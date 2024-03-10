import { ToggleComponent } from './toggle.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule, MockProvider } from 'ng-mocks';
import { FormsModule, NgControl } from '@angular/forms';

describe('ToggleComponent', () => {
  let spectator: Spectator<ToggleComponent>;
  let component: ToggleComponent;

  let containerElement: HTMLDivElement | null;
  let inputElement: HTMLInputElement | null;
  let labelElement: HTMLLabelElement | null;

  const createComponent = createComponentFactory({
    component: ToggleComponent,
    imports: [MockModule(FormsModule)],
    providers: [MockProvider(NgControl)],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    containerElement = spectator.query('.simpler-toggle');
    inputElement = spectator.query('input');
    labelElement = spectator.query('label');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add and remove the checked state', () => {
    expect(component.checked).toBe(false);
    expect(inputElement?.checked).toBe(false);
    expect(containerElement?.classList).not.toContain('simpler-toggle-checked');

    component.checked = true;
    spectator.detectChanges();

    expect(component.checked).toBe(true);
    expect(inputElement?.checked).toBe(true);
    expect(containerElement?.classList).toContain('simpler-toggle-checked');

    component.checked = false;
    spectator.detectChanges();

    expect(component.checked).toBe(false);
    expect(inputElement?.checked).toBe(false);
    expect(containerElement?.classList).not.toContain('simpler-toggle-checked');
  });

  it('should add and remove the disabled state', () => {
    expect(component.disabled).toBe(false);
    expect(inputElement?.disabled).toBe(false);
    expect(inputElement?.tabIndex).toBe(0);
    expect(containerElement?.classList).not.toContain(
      'simpler-toggle-disabled'
    );

    component.disabled = true;
    spectator.detectChanges();

    expect(component.disabled).toBe(true);
    expect(inputElement?.disabled).toBe(true);
    expect(containerElement?.classList).toContain('simpler-toggle-disabled');

    component.disabled = false;
    spectator.detectChanges();

    expect(component.disabled).toBe(false);
    expect(inputElement?.disabled).toBe(false);
    expect(inputElement?.tabIndex).toBe(0);
    expect(containerElement?.classList).not.toContain(
      'simpler-toggle-disabled'
    );
  });

  it('should forward name to id of input element', () => {
    component.name = 'toggle-name';
    spectator.detectChanges();

    expect(inputElement?.id).toBe('toggle-name');
  });

  it('should forward name to input element', () => {
    component.name = 'toggle-name';
    spectator.detectChanges();

    expect(inputElement?.name).toBe('toggle-name');
  });

  it('should forward label to the label element content', () => {
    component.label = 'Toggle label';
    spectator.detectChanges();

    labelElement = spectator.query('label');

    expect(labelElement?.textContent?.trim()).toBe('Toggle label');
  });

  it('should forward the required attribute to input element', () => {
    component.required = true;
    spectator.detectChanges();

    expect(inputElement?.required).toBe(true);

    component.required = false;
    spectator.detectChanges();

    expect(inputElement?.required).toBe(false);
  });

  it('should forward the value to input element', () => {
    component.value = 'Toggle value';
    spectator.detectChanges();

    expect(inputElement?.value).toBe('Toggle value');
  });

  it('should add a css class simpler-toggle-label-left', () => {
    component.labelPosition = 'left';
    spectator.detectChanges();

    expect(containerElement?.classList).toContain('simpler-toggle-label-left');
  });

  it('should add a css class simpler-toggle-label-right', () => {
    component.labelPosition = 'right';
    spectator.detectChanges();

    expect(containerElement?.classList).toContain('simpler-toggle-label-right');
  });

  it('should hide the label element when label is not defined', () => {
    expect(labelElement).toBeNull();
  });

  it('should toggle checked state on click', () => {
    expect(component.checked).toBe(false);

    containerElement?.click();
    spectator.detectChanges();

    expect(component.checked).toBe(true);

    containerElement?.click();
    spectator.detectChanges();

    expect(component.checked).toBe(false);
  });

  it('should not toggle `checked` state upon interation while disabled', () => {
    component.disabled = true;

    spectator.detectChanges();
    containerElement?.click();

    expect(component.checked).toBe(false);
  });

  it('should not trigger the click event multiple times', () => {
    // By default, when clicking on a label element, a generated click will be dispatched
    // on the associated input element.
    // Since we're using a label element and a visual hidden input, this behavior can led
    // to an issue, where the click events on the toggle are getting executed twice.

    const spy = jest.spyOn(component, 'onInputClick');

    expect(inputElement?.checked).toBe(false);
    expect(containerElement?.classList).not.toContain('simpler-toggle-checked');

    inputElement?.click();
    spectator.detectChanges();

    expect(containerElement?.classList).toContain('simpler-toggle-checked');
    expect(inputElement?.checked).toBe(true);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should trigger a change event when the native input does', () => {
    jest.spyOn(component.change, 'emit');

    expect(inputElement?.checked).toBe(false);
    expect(containerElement?.classList).not.toContain('simpler-toggle-checked');

    inputElement?.click();
    spectator.detectChanges();

    expect(inputElement?.checked).toBe(true);
    expect(containerElement?.classList).toContain('simpler-toggle-checked');

    spectator.detectChanges();

    // The change event shouldn't fire, because the value change was not caused
    // by any interaction.
    expect(component.change.emit).toHaveBeenCalledTimes(1);
  });

  it('should trigger an input event when the native input triggers change ', () => {
    jest.spyOn(component.input, 'emit');

    expect(inputElement?.checked).toBe(false);
    expect(containerElement?.classList).not.toContain(
      'simpler-toggle-checked'
    );

    inputElement?.click();
    spectator.detectChanges();

    expect(inputElement?.checked).toBe(true);
    expect(containerElement?.classList).toContain('simpler-toggle-checked');

    spectator.detectChanges();

    // The change event shouldn't fire, because the value change was not caused
    // by any interaction.
    expect(component.input.emit).toHaveBeenCalledTimes(1);
  });

  it('should not trigger the change event by changing the native value', () => {
    jest.spyOn(component.change, 'emit');

    expect(inputElement?.checked).toBe(false);
    expect(containerElement?.classList).not.toContain('simpler-toggle-checked');

    component.checked = true;
    spectator.detectChanges();

    expect(inputElement?.checked).toBe(true);
    expect(containerElement?.classList).toContain('simpler-toggle-checked');

    spectator.detectChanges();

    // The change event shouldn't fire, because the value change was not caused
    // by any interaction.
    expect(component.change.emit).not.toHaveBeenCalled();
  });
});
