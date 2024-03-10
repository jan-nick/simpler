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

export type ToggleLabelPosition = 'left' | 'right';

export class ToggleChange {
  source!: ToggleComponent;
  checked!: boolean;
}

@Component({
  selector: 'simpler-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  animations: [fadeInOnEnterAnimation({ duration: AnimationDuration.Normal })],
})
export class ToggleComponent implements ControlValueAccessor {
  @Output() input: EventEmitter<ToggleChange> =
    new EventEmitter<ToggleChange>();
  @Output() readonly change: EventEmitter<ToggleChange> =
    new EventEmitter<ToggleChange>();

  @Input() value: any = 'on';
  @Input() label!: string;
  @Input() caption!: string;
  @Input() name = '';
  @Input() labelPosition: ToggleLabelPosition = 'right';

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: BooleanInput) {
    const checked = coerceBooleanProperty(value);

    if (checked != this.checked) {
      this._checked = checked;
    }
  }
  private _checked = false;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

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
    const event = new ToggleChange();

    event.source = this;
    event.checked = this.checked;

    this.change.emit(event);
    this.input.emit(event);

    if (this._inputElement) {
      this._inputElement.nativeElement.checked = this.checked;
    }
  }

  toggle() {
    this.checked = !this.checked;
  }

  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: (_: boolean) => void): void {
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

  onInputClick($event: Event) {
    $event.stopPropagation();

    if (!this.disabled) {
      this.checked = !this.checked;
    }
  }

  onChange = (_: boolean) => {
    /*  */
  };

  onTouched = () => {
    /*  */
  };

  getValueFromChangeEvent($event: Event) {
    return (<HTMLInputElement>$event.target).checked;
  }
}
