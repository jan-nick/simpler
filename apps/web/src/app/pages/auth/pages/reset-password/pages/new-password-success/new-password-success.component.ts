import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { defaultOnEnterAnimation } from '@simpler/ui';

@Component({
  selector: 'simpler-new-password-success',
  templateUrl: './new-password-success.component.html',
  styleUrls: ['./new-password-success.component.scss'],
  animations: [defaultOnEnterAnimation],
})
export class NewPasswordSuccessComponent {
  constructor(
    private translateService: TranslateService,
    private title: Title
  ) {
    this.title.setTitle(
      this.translateService.instant(
        'pages.auth.resetPassword.newPasswordSuccess.pageTitle'
      )
    );
  }
}
