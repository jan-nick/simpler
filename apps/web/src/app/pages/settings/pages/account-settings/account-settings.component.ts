import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl, Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '@simpler/api/storage';
import { AuthState, selectUser } from '@simpler/auth';
import { UserActions } from '@simpler/users';
import { validateFileType, validateMaxFileSize } from '@simpler/utils';
import { combineLatest, firstValueFrom, of, switchMap } from 'rxjs';
import { ResetEmailConfirmDialogComponent } from './components/reset-email-confirm-dialog/reset-email-confirm-dialog.component';
import { ResetPasswordConfirmDialogComponent } from './components/reset-password-confirm-dialog/reset-password-confirm-dialog.component';

@Component({
  selector: 'simpler-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  readonly ACCEPTED_AVATAR_FILE_TYPES = ['image/png', 'image/jpeg'];

  readonly formGroup = new FormGroup({
    avatarFile: new FormControl<File | null>(null, [
      validateFileType(...this.ACCEPTED_AVATAR_FILE_TYPES),
      validateMaxFileSize(50_000_000),
    ]),
    avatarUrl: new FormControl<SafeUrl | null>(null),
    name: new FormControl('', Validators.maxLength(16)),
  });
  readonly user$ = this.store.select(selectUser);
  readonly avatar$ = combineLatest({
    user: this.user$,
    newAvatar: this.formGroup.get('avatarUrl')?.valueChanges || of(),
  }).pipe(
    switchMap(({ user, newAvatar }) => {
      if (newAvatar) return of(<string>newAvatar);

      if (user?.avatar) {
        return this.storageService.getSignedUrl(user.avatar);
      }

      return of();
    })
  );

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly ngbModal: NgbModal,
    private readonly storageService: StorageService,
    private readonly store: Store<AuthState>,
    private readonly title: Title,
    private readonly translateService: TranslateService
  ) {
    this.title.setTitle(
      this.translateService.instant(
        'pages.settings.pages.accountSettings.pageTitle'
      )
    );
  }

  ngOnInit(): void {
    this.loadFormData();
  }

  async loadFormData() {
    const user = await firstValueFrom(this.user$);

    if (user) {
      this.formGroup.setValue({
        avatarFile: null,
        avatarUrl: null,
        name: user.name,
      });
    }
  }

  onAvatarFileSelect($event: Event) {
    const file = (<HTMLInputElement>$event.target).files?.item(0);
    if (!file) return;

    const objectURL = URL.createObjectURL(file);
    const url = this.domSanitizer.bypassSecurityTrustUrl(objectURL);

    this.formGroup.patchValue({ avatarFile: file, avatarUrl: url });
    this.formGroup.markAsDirty();
  }

  openResetEmailConfirmDialog() {
    this.ngbModal.open(ResetEmailConfirmDialogComponent);
  }

  openResetPasswordConfirmDialog() {
    this.ngbModal.open(ResetPasswordConfirmDialogComponent);
  }

  resetChanges() {
    this.loadFormData();
  }

  async onSubmit() {
    const user = await firstValueFrom(this.user$);
    if (!user) return;

    const avatar = (await this.saveAvatarFile()) || user.avatar;
    const { name } = this.formGroup.value || user.name;

    this.store.dispatch(
      UserActions.updateUser({
        update: {
          id: user.id,
          changes: { avatar, name },
        },
      })
    );

    this.formGroup.reset({ avatarUrl: avatar, name });
  }

  async saveAvatarFile() {
    const user = await firstValueFrom(this.user$);
    const { avatarFile } = this.formGroup.value;
    if (!avatarFile || !user) return;

    // TODO: Error handling
    const { storageUrl } = await firstValueFrom(
      this.storageService.uploadUserAvatarFile(avatarFile, user.id)
    );

    return storageUrl;
  }
}
