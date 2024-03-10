import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'simpler-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.scss'],
})
export class FileUploadModalComponent {
  constructor(private readonly ngbActiveModal: NgbActiveModal) {}

  close() {
    this.ngbActiveModal.close();
  }
}
