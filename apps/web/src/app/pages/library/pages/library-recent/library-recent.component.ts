import { Component, OnInit } from '@angular/core';
import { LibraryRecentService } from './library-recent.service';

@Component({
  selector: 'simpler-library-recent',
  templateUrl: './library-recent.component.html',
  styleUrls: ['./library-recent.component.scss'],
})
export class LibraryRecentComponent implements OnInit {
  constructor(private readonly libraryRecentService: LibraryRecentService) {}

  ngOnInit(): void {
    this.libraryRecentService.loadFiles();
  }
}
