import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';
import { clamp } from '@simpler/utils';

export type ProgressBarCaptionPosition =
  | 'top-left'
  | 'top-right'
  | 'inline-left'
  | 'inline-right'
  | 'bottom-left'
  | 'bottom-right';

export type ProgressBarSize = 'small' | 'large';

@Component({
  selector: 'simpler-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  @Input()
  get value(): number {
    return this._value;
  }
  set value(v: NumberInput) {
    this._value = clamp(coerceNumberProperty(v) || 0);
  }
  private _value = 0;

  @Input() caption = '';
  @Input() captionPosition: ProgressBarCaptionPosition = 'top-left';

  @Input() size: ProgressBarSize = 'large';
}
