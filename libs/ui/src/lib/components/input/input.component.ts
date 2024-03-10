/* eslint-disable @angular-eslint/no-output-native */
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
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
import { AnimationDuration } from '@simpler/types';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { IconName } from 'ngx-bootstrap-icons';

export type InputType =
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export type InputAutocomplete =
  | 'off'
  | 'on'
  | 'name'
  | 'honorific-prefix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'honorific-suffix'
  | 'nickname'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'organization-title'
  | 'organization'
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level4'
  | 'address-level3'
  | 'address-level2'
  | 'address-level1'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-extension'
  | 'impp'
  | 'url'
  | 'photo';

export type InputPrefixSuffixType = 'icon' | 'text';

export class InputChange {
  source!: InputComponent;
  value!: string;
}
export class InputBlur extends InputChange {}
export class InputFocus extends InputChange {}
export class InputEnter extends InputChange {}

@Component({
  selector: 'simpler-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  animations: [fadeInOnEnterAnimation({ duration: AnimationDuration.Normal })],
})
export class InputComponent implements ControlValueAccessor {
  @Output() readonly input: EventEmitter<InputChange> =
    new EventEmitter<InputChange>();

  @Output() readonly change: EventEmitter<InputChange> =
    new EventEmitter<InputChange>();

  @Output() readonly blur: EventEmitter<InputBlur> =
    new EventEmitter<InputBlur>();

  @Output() readonly focus: EventEmitter<InputFocus> =
    new EventEmitter<InputFocus>();

  @Output() readonly enter: EventEmitter<InputEnter> =
    new EventEmitter<InputEnter>();

  @Input()
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    this._value = value;
  }
  private _value = '';

  @Input() placeholder = '';
  @Input() label!: string;
  @Input() caption!: string;

  @Input() prefix!: any | string | IconName;
  @Input() prefixType: InputPrefixSuffixType = 'text';

  @Input() suffix!: any | string | IconName;
  @Input() suffixType: InputPrefixSuffixType = 'text';

  @Input() name = '';
  @Input() type: InputType = 'text';
  @Input() autocomplete: InputAutocomplete = 'off';

  @Input() customErrorMessages!: ValidationErrors;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  @Input()
  get readonly(): boolean {
    return this._readonly;
  }
  set readonly(value: BooleanInput) {
    this._readonly = coerceBooleanProperty(value);
  }
  private _readonly = false;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  private _required = false;

  @ViewChild(HTMLInputElement)
  readonly _inputElement!: ElementRef<HTMLInputElement>;

  focused = false;
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
    if (!this.ngControl) return null;

    const { errors } = this.ngControl;

    return errors;
  }

  constructor(@Optional() private readonly ngControl: NgControl) {
    if (ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  emitChange() {
    const event = new InputChange();

    event.source = this;
    event.value = this.value;

    this.change.emit(event);
    this.input.emit(event);

    this.syncInputValue();
  }

  emitBlur() {
    const event = new InputBlur();

    event.source = this;
    event.value = this.value;

    this.blur.emit(event);

    this.syncInputValue();
  }

  emitFocus() {
    const event = new InputFocus();

    event.source = this;
    event.value = this.value;

    this.focus.emit(event);

    this.syncInputValue();
  }

  emitEnter() {
    const event = new InputEnter();

    event.source = this;
    event.value = this.value;

    this.enter.emit(event);

    this.syncInputValue();
  }

  syncInputValue() {
    if (this._inputElement) {
      this._inputElement.nativeElement.value = this.value;
    }
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (_: string) => void): void {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onChange = (_: string) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  onBlur() {
    this.focused = false;

    this.emitBlur();
  }

  onFocus() {
    this.focused = true;

    this.emitFocus();
  }

  onPressEnter() {
    this.emitEnter();
  }

  getValueFromChangeEvent($event: Event) {
    return (<HTMLInputElement>$event.target).value;
  }
}
