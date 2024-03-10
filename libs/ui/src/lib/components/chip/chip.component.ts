import { Component, HostBinding, Input } from '@angular/core';
import { IconName } from 'ngx-bootstrap-icons';
import { BaseColorName } from '@simpler/types';

export type ChipIconPosition = 'left' | 'right';

@Component({
  selector: 'simpler-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Input() color: BaseColorName = 'primary';

  @Input() icon!: IconName;
  @Input() iconPosition: ChipIconPosition = 'left';

  @Input() tabIndex = '0';

  @HostBinding('attr.tabIndex') private readonly _tabIndex = '-1';
}
