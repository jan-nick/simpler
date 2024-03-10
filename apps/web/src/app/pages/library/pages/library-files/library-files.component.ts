import { Component } from '@angular/core';
import { LibraryFilesService } from './library-files.service';

@Component({
  selector: 'simpler-library-files',
  templateUrl: './library-files.component.html',
  styleUrls: ['./library-files.component.scss'],
})
export class LibraryFilesComponent {
  constructor(
    public readonly libraryFilesService: LibraryFilesService
  ) {}
}
