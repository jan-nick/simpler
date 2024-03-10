import { Component } from '@angular/core';
import { defaultOnEnterAnimation } from '@simpler/ui';
import { LibraryFilesService } from '../../library-files.service';

@Component({
  selector: 'simpler-library-files-path-breadcrumbs',
  templateUrl: './library-files-path-breadcrumbs.component.html',
  styleUrls: ['./library-files-path-breadcrumbs.component.scss'],
  animations: [defaultOnEnterAnimation],
})
export class LibraryFilesPathBreadcrumbsComponent {
  constructor(public readonly libraryFilesService: LibraryFilesService) {}
}
