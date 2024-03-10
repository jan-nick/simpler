import { Component, Input } from '@angular/core';
import { ColorName } from '@simpler/types';

@Component({
  selector: 'simpler-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent {
  @Input() color: ColorName = 'dark-lightest';
}
