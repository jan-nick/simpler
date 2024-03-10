import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Component({
  selector: 'simpler-upload-area',
  templateUrl: './upload-area.component.html',
  styleUrls: ['./upload-area.component.scss'],
})
export class UploadAreaComponent {
  @Output() readonly selectFiles: EventEmitter<File[] | undefined | null> =
    new EventEmitter<File[] | undefined | null>();

  files: File[] | undefined | null;

  readonly ACCEPTED_FILE_TYPES = ['audio/wav', 'audio/mpeg'];
  readonly MAX_UPLOAD_FILES = 5;

  @HostBinding('class.file-over') isFileOver = false;

  @HostListener('dragover', ['$event']) onDragOver($event: DragEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    this.isFileOver = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave($event: DragEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    this.isFileOver = false;
  }

  @HostListener('drop', ['$event']) onDrop($event: DragEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    this.isFileOver = false;

    if ($event.dataTransfer && $event.dataTransfer.files.length > 0) {
      this.files = $event.dataTransfer && Array.from($event.dataTransfer.files);

      this.emitFiles();
    }
  }

  onFileSelect($event: Event) {
    const target = $event.target as HTMLInputElement;

    this.files = target.files && Array.from(target.files);

    this.emitFiles();
  }

  emitFiles() {
    this.selectFiles.emit(this.files);
  }
}
