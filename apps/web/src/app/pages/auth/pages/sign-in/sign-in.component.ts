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
import { LoginError } from '@simpler/types';
import { defaultOnEnterAnimation } from '@simpler/ui';
import { isEmpty } from '@simpler/utils';
import { Store } from '@ngrx/store';
import {
  AuthActions,
  AuthState,
  selectLoginError,
  selectLoginLoaded,
  selectLoginLoading,
} from '@simpler/auth';
import { filter, first } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'simpler-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [defaultOnEnterAnimation],
})
export class SignInComponent implements OnInit {
  readonly formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email(): AbstractControl {
    return this.formGroup.controls['email'];
  }

  get password(): AbstractControl {
    return this.formGroup.controls['password'];
  }

  readonly loading$ = this.store.select(selectLoginLoading);

  constructor(
    private readonly router: Router,
    private readonly store: Store<AuthState>,
    private readonly title: Title,
    private readonly translateService: TranslateService
  ) {
    this.title.setTitle(
      this.translateService.instant('pages.auth.signIn.pageTitle')
    );
  }

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => this.clearAuthErrors());

    this.store
      .select(selectLoginError)
      .pipe(untilDestroyed(this))
      .subscribe((error) => this.setAuthErrors(error));

    this.store
      .select(selectLoginLoaded)
      .pipe(
        filter((loaded) => loaded),
        untilDestroyed(this)
      )
      .subscribe(() => this.router.navigate(['/library']));
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) return;

    const email = this.email.value;
    const password = this.password.value;

    this.store.dispatch(AuthActions.login({ email, password }));
  }

  clearAuthErrors() {
    const emailErrors = this.email.errors;
    const passwordErrors = this.password.errors;

    if (!emailErrors && !passwordErrors) return;

    Object.values(LoginError).forEach((code) => {
      if (emailErrors) delete emailErrors[code];
      if (passwordErrors) delete passwordErrors[code];
    });

    if (emailErrors) {
      this.email.setErrors(isEmpty(emailErrors) ? null : emailErrors);
    }

    if (passwordErrors) {
      this.password.setErrors(isEmpty(passwordErrors) ? null : passwordErrors);
    }
  }

  setAuthErrors(errorCode: null | LoginError) {
    if (!errorCode) return;

    const emailErrors = { ...this.email.errors };
    const passwordErrors = { ...this.password.errors };

    switch (errorCode) {
      case LoginError.InvalidCredentials:
        emailErrors[errorCode] = true;
        break;
      default:
        break;
    }

    this.email.setErrors(emailErrors);
    this.password.setErrors(passwordErrors);
  }
}
