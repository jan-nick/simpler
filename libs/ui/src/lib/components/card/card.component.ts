import { Component, Input } from '@angular/core';
import { IconName } from 'ngx-bootstrap-icons';

@Component({
  selector: 'simpler-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() body = '';
  @Input() icon!: IconName;
}
