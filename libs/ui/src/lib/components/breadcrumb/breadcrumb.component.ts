import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, HostBinding, Input } from '@angular/core';
import { IconName } from 'ngx-bootstrap-icons';

export type BreadCrumbPointerEvents = 'initial' | 'none';

@Component({
  selector: 'simpler-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadCrumbComponent {
  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(value: BooleanInput) {
    this._active = coerceBooleanProperty(value);
  }
  private _active = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  @Input() icon!: IconName;

  @HostBinding('attr.tabIndex') private readonly tabIndex = '-1';
  @HostBinding('style.pointer-events')
  private pointerEvents: BreadCrumbPointerEvents = 'initial';

  private onDisable() {
    this.setPointerEvents(this._disabled ? 'none' : 'initial');
  }

  private setPointerEvents(value: BreadCrumbPointerEvents) {
    this.pointerEvents = value;
  }
}
