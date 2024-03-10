import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryFile } from '@prisma/client';
import { AudioPlayerService } from '../../../../../core/components/audio-player/audio-player.service';

@Component({
  selector: 'simpler-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
})
export class FileItemComponent {
  @Input() file: LibraryFile | undefined;

  @Input() get skeleton(): boolean {
    return this._skeleton;
  }
  set skeleton(value: BooleanInput) {
    this._skeleton = coerceBooleanProperty(value);
  }
  private _skeleton = false;

  @Output() filePlay = new EventEmitter<LibraryFile>();

  hoverCover = false;

  constructor(
    private readonly audioPlayerService: AudioPlayerService,
    private readonly router: Router
  ) {}

  play() {
    if (this.file) {
      this.audioPlayerService.play({ file: this.file });
      this.filePlay.emit(this.file);
    }
  }

  open($event: MouseEvent) {
    if (
      $event.target instanceof HTMLButtonElement ||
      $event.target instanceof SVGElement
    ) {
      return;
    }
    this.router.navigate([], { queryParams: { file: this.file?.id } });
  }

  openDetail($event: MouseEvent) {
    if (
      $event.target instanceof HTMLButtonElement ||
      $event.target instanceof SVGElement
    ) {
      return;
    }
    this.router.navigate(['/file', this.file?.id]);
  }
}
