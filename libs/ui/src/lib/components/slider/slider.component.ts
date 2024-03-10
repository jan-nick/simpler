/* eslint-disable @angular-eslint/no-output-native */
import {
  BooleanInput,
  coerceBooleanProperty,
  coerceNumberProperty,
  NumberInput,
} from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
} from '@angular/forms';
import { clamp } from '@simpler/utils';

export class SliderChange {
  source!: SliderComponent;
  value!: number;
}

export class SliderInput extends SliderChange {}

@Component({
  selector: 'simpler-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements ControlValueAccessor {
  @Output() readonly input: EventEmitter<SliderChange> =
    new EventEmitter<SliderChange>();
  @Output() readonly change: EventEmitter<SliderChange> =
    new EventEmitter<SliderChange>();

  @Input() name = '';

  @Input()
  get value(): number {
    return this._value;
  }
  set value(value: NumberInput) {
    const _value = clamp(coerceNumberProperty(value), this.min, this.max);

    if (_value != this.value) {
      this._value = _value;
    }
  }
  private _value = 0;

  @Input()
  get min(): number {
    return this._min;
  }
  set min(value: NumberInput) {
    this._min = coerceNumberProperty(value);
  }
  private _min = 0;

  @Input()
  get max(): number {
    return this._max;
  }
  set max(value: NumberInput) {
    this._max = coerceNumberProperty(value);
  }
  private _max = 100;

  @Input()
  get step(): number {
    return this._step;
  }
  set step(value: NumberInput) {
    this._step = coerceNumberProperty(value);
  }
  private _step = 1;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  touched = false;

  get invalid(): boolean | null {
    if (!this.ngControl) return false;

    return this.ngControl.invalid;
  }

  get hasError(): boolean | null {
    if (!this.ngControl) return false;

    const { touched } = this.ngControl;

    return this.invalid || this.errors ? touched : false;
  }

  get errors(): ValidationErrors | null {
    const { errors } = this.ngControl;

    return errors;
  }

  @ViewChild(HTMLInputElement)
  readonly _inputElement!: ElementRef<HTMLInputElement>;

  constructor(@Optional() private ngControl: NgControl) {
    if (ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  emitChange() {
    const event = new SliderChange();

    event.source = this;
    event.value = this.value;

    this.change.emit(event);

    this.syncInputValue();
  }

  emitInput() {
    const event = new SliderInput();

    event.source = this;
    event.value = this.value;

    this.input.emit(event);

    this.syncInputValue();
  }

  syncInputValue() {
    if (this._inputElement) {
      this._inputElement.nativeElement.valueAsNumber = this.value;
    }
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(onTouched: never) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onChange = (_: number) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  getValueFromChangeEvent($event: Event) {
    $event.stopPropagation();
    return (<HTMLInputElement>$event.target).valueAsNumber;
  }
}
