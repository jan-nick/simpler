/* eslint-disable @angular-eslint/no-output-native */
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

export class TabSelect {
  source!: TabComponent;
  selected!: boolean;
}

@Component({
  selector: 'simpler-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  @Output() select = new EventEmitter<TabSelect>();

  @Input() label = '';
  @Input() value = '';

  selected = false;

  @HostBinding('attr.tabIndex') private readonly tabIndex = '-1';

  selectTab() {
    this.selected = true;

    this.emitSelect();
  }

  emitSelect() {
    const event = new TabSelect();

    event.source = this;
    event.selected = this.selected;

    this.select.emit(event);
  }
}
