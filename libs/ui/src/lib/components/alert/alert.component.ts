import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, HostBinding, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnimationDuration, BaseColorName } from '@simpler/types';
import { fadeOutDownOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'simpler-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [fadeOutDownOnLeaveAnimation({ duration: AnimationDuration.Short })],
})
export class AlertComponent {
  @Input() color: BaseColorName = 'primary';

  @Input()
  get dismissable(): boolean {
    return this._dismissable;
  }
  set dismissable(value: BooleanInput) {
    this._dismissable = coerceBooleanProperty(value);
  }
  private _dismissable = false;

  @Input() dismissText: string = this.translateService.instant(
    'components.alert.dismissButton'
  );

  @HostBinding('attr.tabIndex') private readonly tabIndex = '-1';

  dismissed = false;

  constructor(private translateService: TranslateService) {}

  dismiss() {
    this.dismissed = true;
  }
}
