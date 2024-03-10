import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Title } from '@angular/platform-browser';
import { ResetPasswordError } from '@simpler/types';
import { defaultOnEnterAnimation } from '@simpler/ui';
import { isEmpty } from '@simpler/utils';
import {
  AuthActions,
  AuthState,
  selectForgotPasswordError,
  selectForgotPasswordLoaded,
  selectForgotPasswordLoading,
} from '@simpler/auth';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'simpler-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [defaultOnEnterAnimation],
})
export class ResetPasswordComponent implements OnInit {
  readonly formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get email(): AbstractControl {
    return this.formGroup.controls['email'];
  }

  readonly loading$ = this.store.select(selectForgotPasswordLoading);

  constructor(
    private readonly router: Router,
    private readonly store: Store<AuthState>,
    private readonly title: Title,
    private readonly translateService: TranslateService
  ) {
    this.title.setTitle(
      this.translateService.instant('pages.auth.resetPassword.pageTitle')
    );
  }

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => this.clearAuthErrors());

    this.store
      .select(selectForgotPasswordError)
      .pipe(untilDestroyed(this))
      .subscribe((error) => this.setAuthErrors(error));

    this.store
      .select(selectForgotPasswordLoaded)
      .pipe(
        filter((loaded) => loaded),
        first(),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.router.navigate(['/library']);
      });
  }

  async onSubmit() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) return;

    const email = this.email.value;

    this.store.dispatch(AuthActions.forgotPassword({ email }));
  }

  clearAuthErrors() {
    const emailErrors = this.email.errors;

    if (!emailErrors) return;

    Object.values(ResetPasswordError).forEach((code) => {
      if (emailErrors) delete emailErrors[code];
    });

    if (emailErrors) {
      this.email.setErrors(isEmpty(emailErrors) ? null : emailErrors);
    }
  }

  setAuthErrors(errorCode: unknown) {
    if (!errorCode) return;

    const emailErrors = { ...this.email.errors };

    switch (errorCode) {
      default:
        break;
    }

    this.email.setErrors(emailErrors);
  }
}
