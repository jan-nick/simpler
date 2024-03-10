import { FormsModule, NgControl } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockModule, MockProvider } from 'ng-mocks';

import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let spectator: Spectator<SliderComponent>;
  let component: SliderComponent;

  let containerElement: HTMLDivElement | null;
  let inputElement: HTMLInputElement | null;

  const createComponent = createComponentFactory({
    component: SliderComponent,
    imports: [MockModule(FormsModule)],
    providers: [MockProvider(NgControl)],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    containerElement = spectator.query('.simpler-slider');
    inputElement = spectator.query('input');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add and remove the disabled state', () => {
    expect(component.disabled).toBe(false);
    expect(inputElement).not.toBeDisabled();
    expect(containerElement).not.toHaveClass('simpler-slider-disabled');

    component.disabled = true;
    spectator.detectChanges();

    expect(component.disabled).toBe(true);
    expect(inputElement).not.toBeDisabled();
    expect(containerElement).toHaveClass('simpler-slider-disabled');

    component.disabled = false;
    spectator.detectChanges();

    expect(component.disabled).toBe(false);
    expect(inputElement).not.toBeDisabled();
    expect(containerElement).not.toHaveClass('simpler-slider-disabled');
  });

  it('should forward name to id of input element', () => {
    component.name = 'checkbox-name';
    spectator.detectChanges();

    expect(inputElement?.id).toBe('checkbox-name');
  });

  it('should forward name to input element', () => {
    component.name = 'checkbox-name';
    spectator.detectChanges();

    expect(inputElement?.name).toBe('checkbox-name');
  });



  describe('emitChange', () => {
    it('should emit change', () => {
      spectator.setInput({ value: 50 });
      const spy = jest.spyOn(component.change, 'emit');

      component.emitChange();

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({ source: component, value: 50 });
    });

    it('should call syncInputValue', () => {
      const spy = jest.spyOn(component, 'syncInputValue');

      component.emitChange();

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('emitInput', () => {
    it('should emit input', () => {
      spectator.setInput({ value: 50 });
      const spy = jest.spyOn(component.input, 'emit');

      component.emitInput();

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({ source: component, value: 50 });
    });

    it('should call syncInputValue', () => {
      const spy = jest.spyOn(component, 'syncInputValue');

      component.emitInput();

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('writeValue', () => {
    it('should assign this.value to passed value', () => {
      component.writeValue(20);
      expect(component.value).toBe(20);
    });
  });
});
