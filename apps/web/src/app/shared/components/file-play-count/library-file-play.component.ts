import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@simpler/ui';
import { LibraryFilePlay } from '@prisma/client';

@Component({
  selector: 'simpler-library-file-play',
  standalone: true,
  imports: [CommonModule, UIModule],
  templateUrl: './library-file-play.component.html',
  styleUrls: ['./library-file-play.component.scss'],
})
export class LibraryFilePlayComponent {
  @Input() libraryFilePlays: LibraryFilePlay[] | null | undefined;
}
