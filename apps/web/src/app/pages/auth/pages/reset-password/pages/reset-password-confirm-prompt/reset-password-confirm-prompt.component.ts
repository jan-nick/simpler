import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  AuthActions,
  AuthState,
  selectForgotPasswordLoading,
} from '@simpler/auth';
import { defaultOnEnterAnimation } from '@simpler/ui';

@UntilDestroy()
@Component({
  selector: 'simpler-reset-password-confirm-prompt',
  templateUrl: './reset-password-confirm-prompt.component.html',
  styleUrls: ['./reset-password-confirm-prompt.component.scss'],
  animations: [defaultOnEnterAnimation],
})
export class ResetPasswordConfirmPromptComponent implements OnInit {
  email!: string;

  readonly loading$ = this.store.select(selectForgotPasswordLoading);

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store<AuthState>,
    private readonly translateService: TranslateService,
    private readonly title: Title
  ) {
    this.title.setTitle(
      this.translateService.instant(
        'pages.auth.resetPassword.resetPasswordConfirmPrompt.pageTitle'
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

  resendResetPasswordEmail() {
    this.store.dispatch(AuthActions.forgotPassword({ email: this.email }));
  }
}
