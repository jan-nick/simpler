import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, HostBinding, Input } from '@angular/core';
import { BaseColorName } from '@simpler/types';
import { IconName } from 'ngx-bootstrap-icons';

export type IconButtonAppearance = 'solid' | 'outline' | 'transparent';

export type IconButtonSize = 'small' | 'large';

export type IconButtonPointerEvents = 'initial' | 'none';

export type IconButtonType = 'button' | 'reset' | 'submit';

@Component({
  selector: 'simpler-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  @Input() appearance: IconButtonAppearance = 'solid';
  @Input() color: BaseColorName = 'primary';
  @Input() size: IconButtonSize = 'large';

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);

    this.onDisable();
  }
  private _disabled = false;

  @Input()
  get loading(): boolean {
    return this._loading;
  }
  set loading(value: BooleanInput) {
    this._loading = coerceBooleanProperty(value);

    this.onLoading();
  }
  private _loading = false;

  @Input() icon!: IconName;

  @Input() type: IconButtonType = 'button';

  @HostBinding('attr.tabIndex') private readonly tabIndex = '-1';
  @HostBinding('style.pointer-events')
  private pointerEvents: IconButtonPointerEvents = 'initial';

  private onDisable() {
    this.setPointerEvents(this._disabled ? 'none' : 'initial');
  }

  private onLoading() {
    this.setPointerEvents(this._loading ? 'none' : 'initial');
  }

  private setPointerEvents(value: IconButtonPointerEvents) {
    this.pointerEvents = value;
  }
}
