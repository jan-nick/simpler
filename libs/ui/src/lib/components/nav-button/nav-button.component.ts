import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, HostBinding, Input } from '@angular/core';
import { IconName } from 'ngx-bootstrap-icons';

export type NavButtonCaretDirection = 'right' | 'down';
export type NavButtonPointerEvents = 'initial' | 'none';

@Component({
  selector: 'simpler-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.scss'],
})
export class NavButtonComponent {
  @Input() routerLink: string | any[] | null | undefined;

  @Input() icon!: IconName;

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

  @Input()
  get caret(): boolean {
    return this._caret;
  }
  set caret(value: BooleanInput) {
    this._caret = coerceBooleanProperty(value);
  }
  private _caret = false;

  @Input() caretDirection: NavButtonCaretDirection = 'right';

  @HostBinding('attr.tabIndex') private readonly tabIndex = '-1';
  @HostBinding('style.pointer-events')
  private pointerEvents: NavButtonPointerEvents = 'initial';

  private onDisable() {
    this.setPointerEvents(this._disabled ? 'none' : 'initial');
  }

  private onLoading() {
    this.setPointerEvents(this._loading ? 'none' : 'initial');
  }

  private setPointerEvents(value: NavButtonPointerEvents) {
    this.pointerEvents = value;
  }
}
