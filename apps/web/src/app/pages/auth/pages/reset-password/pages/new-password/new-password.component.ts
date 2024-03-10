import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, first, firstValueFrom } from 'rxjs';
import { ResetPasswordError } from '@simpler/types';
import { defaultOnEnterAnimation } from '@simpler/ui';
import { isEmpty, passwordPattern } from '@simpler/utils';
import {
  AuthActions,
  AuthState,
  selectResetPasswordError,
  selectResetPasswordLoaded,
  selectResetPasswordLoading,
} from '@simpler/auth';
import { Store } from '@ngrx/store';

@UntilDestroy()
@Component({
  selector: 'simpler-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  animations: [defaultOnEnterAnimation],
})
export class NewPasswordComponent implements OnInit {
  readonly formGroup: FormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(passwordPattern),
    ]),
  });

  get password(): AbstractControl {
    return this.formGroup.controls['password'];
  }

  readonly loading$ = this.store.select(selectResetPasswordLoading);

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<AuthState>,
    private readonly title: Title,
    private readonly translateService: TranslateService
  ) {
    this.title.setTitle(
      this.translateService.instant(
        'pages.auth.resetPassword.newPassword.pageTitle'
      )
    );
  }

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => this.clearAuthErrors());

    this.store
      .select(selectResetPasswordError)
      .pipe(untilDestroyed(this))
      .subscribe((error) => this.setAuthErrors(error));

    this.store
      .select(selectResetPasswordLoaded)
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

    const { id } = await firstValueFrom(this.activatedRoute.queryParams);
    const password = this.password.value;

    this.store.dispatch(AuthActions.resetPassword({ userId: id, password }));

    await this.router.navigate(['/reset-password/success']);
  }

  clearAuthErrors() {
    const passwordErrors = this.password.errors;

    if (!passwordErrors) return;

    Object.values(ResetPasswordError).forEach((code) => {
      if (passwordErrors) delete passwordErrors[code];
    });

    if (passwordErrors) {
      this.password.setErrors(isEmpty(passwordErrors) ? null : passwordErrors);
    }
  }

  setAuthErrors(errorCode: unknown) {
    if (!errorCode) return;

    const passwordErrors = { ...this.password.errors };

    switch (errorCode) {
      default:
        break;
    }

    this.password.setErrors(passwordErrors);
  }
}
