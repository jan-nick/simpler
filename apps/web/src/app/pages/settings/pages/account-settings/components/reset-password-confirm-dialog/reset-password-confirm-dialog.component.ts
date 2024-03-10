import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AuthActions, AuthState, selectUser } from '@simpler/auth';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'simpler-reset-password-confirm-dialog',
  templateUrl: './reset-password-confirm-dialog.component.html',
  styleUrls: ['./reset-password-confirm-dialog.component.scss'],
})
export class ResetPasswordConfirmDialogComponent implements OnInit {
  constructor(
    private readonly ngbActiveModal: NgbActiveModal,
    private readonly store: Store<AuthState>
  ) {}

  ngOnInit(): void {}

  close() {
    this.ngbActiveModal.close();
  }

  async confirm() {
    const email = (await firstValueFrom(this.store.select(selectUser)))?.email;
    if (!email) return;

    this.store.dispatch(AuthActions.forgotPassword({ email })); // TODO

    this.close();
  }
}
