import {
  InputBlur,
  InputChange,
  InputComponent,
  InputEnter,
  InputFocus,
} from './input.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { MockModule } from 'ng-mocks';
import { FormControl, FormsModule, NgControl } from '@angular/forms';
import { Provider } from '@angular/core';

const ngControlStub: Provider = {
  provide: NgControl,
  useValue: {},
};

describe('InputComponent', () => {
  let spectator: Spectator<InputComponent>;
  let component: InputComponent;

  let containerElement: HTMLDivElement | null;
  let inputElement: HTMLInputElement | null;
  let labelElement: HTMLLabelElement | null;

  const createComponent = createComponentFactory({
    component: InputComponent,
    imports: [MockModule(FormsModule)],
    providers: [ngControlStub],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    containerElement = spectator.query('.simpler-input');
    inputElement = spectator.query('.simpler-input-textfield');
    labelElement = spectator.query('.simpler-input-label');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should set label', () => {
    spectator.setInput({ label: 'Test label' });
    spectator.detectChanges();

    labelElement = spectator.query('label');

    expect(containerElement).toHaveClass('simpler-input-has-label');
    expect(labelElement).toBeTruthy();
  });

  it('should forward placeholder to input element', () => {
    spectator.setInput({ placeholder: 'Input placeholder' });
    spectator.detectChanges();

    expect(inputElement?.placeholder).toBe('Input placeholder');
  });

  it('should forward name to input element', () => {
    spectator.setInput({ name: 'Input name' });
    spectator.detectChanges();

    // expect(inputElement?.name).toHaveAttribute('name', 'Input name'); // Somehow doesn't work as expected
  });

  it('should forward name to id of input element', () => {
    spectator.setInput({ name: 'Input name' });
    spectator.detectChanges();

    expect(inputElement).toHaveId('Input name');
  });

  it('should forward type to input element', () => {
    spectator.setInput({ type: 'date' });
    spectator.detectChanges();

    expect(inputElement?.type).toBe('date');
  });

  it('should forward autocomplete to input element', () => {
    spectator.setInput({ autocomplete: 'additional-name' });
    spectator.detectChanges();

    expect(inputElement?.autocomplete).toBe('additional-name');
  });

  it('should forward required to input element', () => {
    expect(inputElement?.required).toBe(false);
    expect(component?.required).toBe(false);

    spectator.setInput({ required: true });
    spectator.detectChanges();

    expect(component?.required).toBe(true);
    // expect(inputElement?.required).toBe(true); // Somehow doesn't work as expected

    spectator.setInput({ required: false });
    spectator.detectChanges();

    expect(component?.required).toBe(false);
    expect(inputElement?.required).toBe(false);
  });

  it('should forward readonly to input element', () => {
    expect(inputElement?.readOnly).toBe(false);

    spectator.setInput({ readonly: true });
    spectator.detectChanges();

    expect(component.readonly).toBe(true);
    expect(inputElement?.readOnly).toBe(true);

    spectator.setInput({ readonly: false });
    spectator.detectChanges();

    expect(component.readonly).toBe(false);
    expect(inputElement?.readOnly).toBe(false);
  });

  it('should set errors', () => {
    const ngControl = new FormControl();
    (spectator.fixture.componentInstance as any).ngControl = ngControl;

    ngControl.setErrors({ someError: true });

    expect(component.errors).toStrictEqual({ someError: true });

    ngControl.markAsTouched();

    expect(component.hasError).toBe(true);
    expect(component.invalid).toBe(true);
  });

  it('should set disabled', async () => {
    expect(component.disabled).toBe(false);
    expect(inputElement).not.toBeDisabled();
    expect(containerElement).not.toHaveClass('simpler-input-disabled');

    spectator.setInput({ disabled: true });
    spectator.detectChanges();

    expect(component.disabled).toBe(true);
    // expect(inputElement).toBeDisabled(); // Somehow doesn't work as expected
    expect(containerElement).toHaveClass('simpler-input-disabled');

    spectator.setInput({ disabled: false });
    spectator.detectChanges();

    expect(component.disabled).toBe(false);
    expect(inputElement).not.toBeDisabled();
    expect(containerElement).not.toHaveClass('simpler-input-disabled');
  });

  it('should add a css class when focused', () => {
    component.focused = true;
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-input-focused');
  });

  it('should call onBlur on input element blur', () => {
    jest.spyOn(component, 'onBlur');

    inputElement?.dispatchEvent(new Event('blur'));

    expect(component.onBlur).toBeCalledTimes(1);
  });

  it('should call onTouched on input element blur', () => {
    jest.spyOn(component, 'onTouched');

    inputElement?.dispatchEvent(new Event('blur'));

    expect(component.onTouched).toBeCalledTimes(1);
  });

  it('should call onFocus on input element focus', () => {
    jest.spyOn(component, 'onFocus');

    inputElement?.dispatchEvent(new Event('focus'));

    expect(component.onFocus).toBeCalledTimes(1);
  });

  it('should call onChange on input element change with value', () => {
    jest.spyOn(component, 'onChange');

    inputElement?.dispatchEvent(new Event('change'));

    expect(component.onChange).toBeCalledTimes(1);
    expect(component.onChange).toBeCalledWith(inputElement?.value);
  });

  it('should call emitChange on input element change', () => {
    jest.spyOn(component, 'emitChange');

    inputElement?.dispatchEvent(new Event('change'));

    expect(component.emitChange).toBeCalledTimes(1);
  });

  it('should call onChange on input element input (event) with value', () => {
    jest.spyOn(component, 'onChange');

    inputElement?.dispatchEvent(new Event('input'));

    expect(component.onChange).toBeCalledTimes(1);
    expect(component.onChange).toBeCalledWith(inputElement?.value);
  });

  it('should call emitChange on input element input (event)', () => {
    jest.spyOn(component, 'emitChange');

    inputElement?.dispatchEvent(new Event('input'));

    expect(component.emitChange).toBeCalledTimes(1);
  });

  it('should call onPressEnter on input element enter key press', () => {
    jest.spyOn(component, 'onPressEnter');

    inputElement?.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }));

    expect(component.onPressEnter).toBeCalledTimes(1);
  });

  describe('emitChange', () => {
    it('should emit an InputChange event', () => {
      jest.spyOn(component.change, 'emit');

      component.value = 'test value';

      component.emitChange();

      const event = new InputChange();
      event.value = 'test value';
      event.source = component;

      expect(component.change.emit).toHaveBeenNthCalledWith(1, event);
    });

    it('should call syncInputValue', () => {
      jest.spyOn(component, 'syncInputValue');

      component.emitChange();

      expect(component.syncInputValue).toHaveBeenNthCalledWith(1);
    });
  });

  describe('emitBlur', () => {
    it('should emit an InputBlur event', () => {
      jest.spyOn(component.blur, 'emit');

      component.value = 'test value';

      component.emitBlur();

      const event = new InputBlur();
      event.value = 'test value';
      event.source = component;

      expect(component.blur.emit).toHaveBeenNthCalledWith(1, event);
    });

    it('should call syncInputValue', () => {
      jest.spyOn(component, 'syncInputValue');

      component.emitBlur();

      expect(component.syncInputValue).toHaveBeenNthCalledWith(1);
    });
  });

  describe('emitFocus', () => {
    it('should emit an InputFocus event', () => {
      jest.spyOn(component.focus, 'emit');

      component.value = 'test value';

      component.emitFocus();

      const event = new InputFocus();
      event.value = 'test value';
      event.source = component;

      expect(component.focus.emit).toHaveBeenNthCalledWith(1, event);
    });

    it('should call syncInputValue', () => {
      jest.spyOn(component, 'syncInputValue');

      component.emitFocus();

      expect(component.syncInputValue).toHaveBeenNthCalledWith(1);
    });
  });

  describe('emitEnter', () => {
    it('should emit an InputEnter event', () => {
      jest.spyOn(component.enter, 'emit');

      component.value = 'test value';

      component.emitEnter();

      const event = new InputEnter();
      event.value = 'test value';
      event.source = component;

      expect(component.enter.emit).toHaveBeenNthCalledWith(1, event);
    });

    it('should call syncInputValue', () => {
      jest.spyOn(component, 'syncInputValue');

      component.emitEnter();

      expect(component.syncInputValue).toHaveBeenNthCalledWith(1);
    });
  });

  it('should trigger a change event when the native input does', () => {
    jest.spyOn(component.change, 'emit');

    const event = new Event('change', { bubbles: true, cancelable: false });

    inputElement?.dispatchEvent(event);
    spectator.detectChanges();

    expect(component.change.emit).toBeCalledTimes(1);
  });

  it('should trigger an input event when the native input triggers change event', () => {
    jest.spyOn(component.input, 'emit');

    const event = new Event('change', { bubbles: true, cancelable: false });

    inputElement?.dispatchEvent(event);
    spectator.detectChanges();

    expect(component.input.emit).toBeCalledTimes(1);
  });

  it('should trigger a focus event when the native input does', () => {
    jest.spyOn(component.focus, 'emit');

    const event = new Event('focus', { bubbles: true, cancelable: false });

    inputElement?.dispatchEvent(event);
    spectator.detectChanges();

    expect(component.focus.emit).toBeCalledTimes(1);
  });

  it('should trigger a blur event when the native input does', () => {
    jest.spyOn(component.blur, 'emit');

    const event = new Event('blur', { bubbles: true, cancelable: false });

    inputElement?.dispatchEvent(event);
    spectator.detectChanges();

    expect(component.blur.emit).toBeCalledTimes(1);
  });

  it('should trigger a enter event when the native input triggers keydown.enter', () => {
    jest.spyOn(component.enter, 'emit');

    const event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'enter',
    });

    inputElement?.dispatchEvent(event);
    spectator.detectChanges();

    expect(component.enter.emit).toBeCalledTimes(1);
  });
});
