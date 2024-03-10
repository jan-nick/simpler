import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { defaultOnEnterAnimation } from '@simpler/ui';

@UntilDestroy()
@Component({
  selector: 'simpler-email-confirm-prompt',
  templateUrl: './email-confirm-prompt.component.html',
  styleUrls: ['./email-confirm-prompt.component.scss'],
  animations: [defaultOnEnterAnimation],
})
export class EmailConfirmPromptComponent implements OnInit {
  email!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private title: Title
  ) {
    this.title.setTitle(
      this.translateService.instant(
        'pages.auth.signUp.emailConfirmPrompt.pageTitle'
      )
    );
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(untilDestroyed(this))
      .subscribe(({ email }) => {
        this.email = email;
      });
  }

  // ! Resend not supported by BE yet
  // async sendEmailConfirm() {}
}
