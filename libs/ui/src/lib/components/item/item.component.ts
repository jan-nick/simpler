import { Component } from '@angular/core';

@Component({
  selector: 'simpler-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  selected = false; // Todo: Integrate with list component
}
