import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from '@simpler/api/storage';
import { Observable } from 'rxjs';

export type FileCoverSize = 'small' | 'medium' | 'larger' | 'largest';

@Component({
  selector: 'simpler-file-cover',
  templateUrl: './file-cover.component.html',
  styleUrls: ['./file-cover.component.scss'],
})
export class FileCoverComponent implements OnInit {
  @Input() coverUrl: string | null | undefined;
  @Input() size: FileCoverSize = 'largest';

  signedCoverUrl$: Observable<string | undefined | null> | undefined;

  constructor(private readonly storageService: StorageService) {}

  ngOnInit(): void {
    if (this.coverUrl) {
      this.signedCoverUrl$ = this.storageService.getSignedUrl(this.coverUrl);
    }
  }
}
