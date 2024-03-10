import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LibraryFile } from '@prisma/client';
import { AudioPlayerService } from '../../../../../core/components/audio-player/audio-player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'simpler-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss'],
})
export class FileCardComponent {
  @Input() file!: LibraryFile;

  @Input()
  get skeleton(): boolean {
    return this._skeleton;
  }
  set skeleton(value: BooleanInput) {
    this._skeleton = coerceBooleanProperty(value);
  }
  private _skeleton = false;

  @Output() filePlay = new EventEmitter<LibraryFile>();

  hover = false;

  constructor(
    private readonly audioPlayerService: AudioPlayerService,
    private readonly router: Router
  ) {}

  play() {
    this.audioPlayerService.play({ file: this.file });
    this.filePlay.emit(this.file);
  }

  open($event: MouseEvent) {
    if (
      $event.target instanceof HTMLButtonElement ||
      $event.target instanceof SVGElement
    ) {
      return;
    }
    this.router.navigate([], { queryParams: { file: this.file.id } });
  }
}
