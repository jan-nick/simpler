import { Component, Input } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { LibraryFile } from '@prisma/client';

@Component({
  selector: 'simpler-completed-upload-item',
  templateUrl: './completed-upload-item.component.html',
  styleUrls: ['./completed-upload-item.component.scss'],
})
export class CompletedUploadItemComponent {
  @Input() upload: Partial<LibraryFile> | undefined;

  @Input()
  get skeleton(): boolean {
    return this._skeleton;
  }
  set skeleton(value: BooleanInput) {
    this._skeleton = coerceBooleanProperty(value);
  }
  private _skeleton = false;
}
