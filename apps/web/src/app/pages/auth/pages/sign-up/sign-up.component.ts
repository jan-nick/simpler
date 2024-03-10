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
import { SignUpError } from '@simpler/types';
import { defaultOnEnterAnimation } from '@simpler/ui';
import { isEmpty, passwordPattern } from '@simpler/utils';
import { Store } from '@ngrx/store';
import {
  AuthActions,
  AuthState,
  selectSignUpError,
  selectSignUpLoaded,
  selectSignUpLoading,
} from '@simpler/auth';
import { filter } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'simpler-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [defaultOnEnterAnimation],
})
export class SignUpComponent implements OnInit {
  readonly formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(passwordPattern),
    ]),
  });

  get email(): AbstractControl {
    return this.formGroup.controls['email'];
  }

  get password(): AbstractControl {
    return this.formGroup.controls['password'];
  }

  readonly loading$ = this.store.select(selectSignUpLoading);

  constructor(
    private router: Router,
    private store: Store<AuthState>,
    private title: Title,
    private translateService: TranslateService
  ) {
    this.title.setTitle(
      this.translateService.instant('pages.auth.signUp.pageTitle')
    );
  }

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => this.clearAuthErrors());

    this.store
      .select(selectSignUpError)
      .pipe(untilDestroyed(this))
      .subscribe((error) => this.setAuthErrors(error));

    this.store
      .select(selectSignUpLoaded)
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

    this.store.dispatch(AuthActions.signUp({ email, password }));
  }

  clearAuthErrors() {
    const emailErrors = this.email.errors;
    const passwordErrors = this.password.errors;

    if (!emailErrors && !passwordErrors) return;

    Object.values(SignUpError).forEach((code) => {
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

  setAuthErrors(errorCode: SignUpError | null) {
    if (!errorCode) return;

    const emailErrors = { ...this.email.errors };
    const passwordErrors = { ...this.password.errors };

    switch (errorCode) {
      case SignUpError.EmailTaken:
        emailErrors[errorCode] = true;
        break;
      default:
        break;
    }

    this.email.setErrors(emailErrors);
    this.password.setErrors(passwordErrors);
  }
}
