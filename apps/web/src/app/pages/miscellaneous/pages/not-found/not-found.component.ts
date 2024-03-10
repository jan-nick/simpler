import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { defaultOnEnterAnimation } from '@simpler/ui';

@Component({
  selector: 'simpler-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  animations: [defaultOnEnterAnimation],
})
export class NotFoundComponent {
  constructor(
    private translateService: TranslateService,
    private title: Title
  ) {
    this.title.setTitle(
      this.translateService.instant('pages.miscellaneous.notFound.pageTitle')
    );
  }
}
