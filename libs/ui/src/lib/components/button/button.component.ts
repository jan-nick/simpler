import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, HostBinding, Input } from '@angular/core';
import { BaseColorName } from '@simpler/types';
import { IconName } from 'ngx-bootstrap-icons';

export type ButtonExpand = 'auto' | 'block';

export type ButtonAppearance = 'solid' | 'outline' | 'transparent';

export type ButtonIconPosition = 'left' | 'right';

export type ButtonPointerEvents = 'initial' | 'none';

export type ButtonType = 'button' | 'reset' | 'submit';

@Component({
  selector: 'simpler-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() color: BaseColorName = 'primary';
  @Input() appearance: ButtonAppearance = 'solid';

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
  @Input() iconPosition: ButtonIconPosition = 'left';

  @Input() type: ButtonType = 'button';

  @HostBinding('attr.tabIndex') private readonly tabIndex = '-1';
  @HostBinding('style.pointer-events')
  private pointerEvents: ButtonPointerEvents = 'initial';

  private onDisable() {
    this.setPointerEvents();
  }

  private onLoading() {
    this.setPointerEvents();
  }

  private setPointerEvents() {
    this.pointerEvents = this._disabled || this._loading ? 'none' : 'initial';
  }
}
