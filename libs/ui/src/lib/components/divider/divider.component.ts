import { Component, Input } from '@angular/core';

export type DividerSize = 'large' | 'small';

export type DividerDirection = 'horizontal' | 'vertical';

@Component({
  selector: 'simpler-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
})
export class DividerComponent {
  @Input() size: DividerSize = 'small';
  @Input() direction: DividerDirection = 'horizontal';
}
