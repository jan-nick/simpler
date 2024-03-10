import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';
import { IconName } from 'ngx-bootstrap-icons';

export type IconSize = 'small' | 'medium' | 'large' | 'larger' | 'largest';

export const iconSizeSpecs = {
  small: '16px',
  medium: '24px',
  large: '48px',
  larger: '64px',
  largest: '80px',
};

@Component({
  selector: 'simpler-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() name!: IconName;
  @Input() size: IconSize = 'medium';
  @Input()
  get withBackground(): boolean {
    return this._withBackground;
  }
  set withBackground(value: BooleanInput) {
    this._withBackground = coerceBooleanProperty(value);
  }
  private _withBackground = false;

  sizeSpecs = iconSizeSpecs;
}
