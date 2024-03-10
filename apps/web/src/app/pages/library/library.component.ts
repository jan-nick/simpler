import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AnimationDuration } from '@simpler/types';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { getRouterSelectors, RouterState } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { FileSidebarComponent } from './shared/components/file-sidebar/file-sidebar.component';
import { distinctUntilChanged } from 'rxjs';

const { selectQueryParam } = getRouterSelectors();

@Component({
  selector: 'simpler-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  animations: [fadeInOnEnterAnimation({ duration: AnimationDuration.Normal })],
})
export class LibraryComponent implements OnInit {
  constructor(
    private readonly ngbOffcanvas: NgbOffcanvas,
    private readonly store: Store,
    private readonly title: Title,
    private readonly translateService: TranslateService
  ) {
    this.title.setTitle(
      this.translateService.instant('pages.library.pageTitle')
    );
  }

  ngOnInit(): void {
    this.initFileSidebar();
  }

  initFileSidebar() {
    let offcanvasRef: NgbOffcanvasRef | undefined;

    this.store
      .select(selectQueryParam('file'))
      .pipe(distinctUntilChanged())
      .subscribe(async (libraryFileId) => {
        if (!libraryFileId) return;

        offcanvasRef?.close();

        offcanvasRef = this.ngbOffcanvas.open(FileSidebarComponent, {
          position: 'end',
          backdrop: false,
          container: '.library-container',
          panelClass: 'library-sidebar',
        });
        offcanvasRef.componentInstance.libraryFileId = libraryFileId;
      });
  }
}
