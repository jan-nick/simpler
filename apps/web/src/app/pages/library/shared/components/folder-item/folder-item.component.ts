import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';
import { LibraryFolder } from '@prisma/client';

@Component({
  selector: 'simpler-folder-item',
  templateUrl: './folder-item.component.html',
  styleUrls: ['./folder-item.component.scss'],
})
export class FolderItemComponent {
  @Input() folder!: LibraryFolder;

  @Input()
  get skeleton(): boolean {
    return this._skeleton;
  }
  set skeleton(value: BooleanInput) {
    this._skeleton = coerceBooleanProperty(value);
  }
  private _skeleton = false;
}
