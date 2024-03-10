import { Component, Input } from '@angular/core';
import { ColorName } from '@simpler/types';
export type SpinnerSize = 'small' | 'medium' | 'large';

export const SpinnerSizeSpecs = {
  small: '16px',
  medium: '24px',
  large: '48px',
};

@Component({
  selector: 'simpler-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Input() color!: ColorName;
  @Input() size: SpinnerSize = 'medium';
}
