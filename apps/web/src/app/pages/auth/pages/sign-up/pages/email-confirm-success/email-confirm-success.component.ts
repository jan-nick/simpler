import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { defaultOnEnterAnimation } from '@simpler/ui';

@Component({
  selector: 'simpler-email-confirm-success',
  templateUrl: './email-confirm-success.component.html',
  styleUrls: ['./email-confirm-success.component.scss'],
  animations: [defaultOnEnterAnimation],
})
export class EmailConfirmSuccessComponent {
  constructor(
    private title: Title,
    private translateService: TranslateService
  ) {
    this.title.setTitle(
      this.translateService.instant(
        'pages.auth.signUp.emailConfirmSuccess.pageTitle'
      )
    );
  }
}
