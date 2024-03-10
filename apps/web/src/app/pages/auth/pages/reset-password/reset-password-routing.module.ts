import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPasswordGuard } from '@simpler/auth';
import { NavbarState } from '../../../../core/components/navbar/navbar.component';
import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [
  { path: '', component: ResetPasswordComponent },
  {
    // TODO: Prevent access when not resetting password
    path: 'confirm',
    loadChildren: () =>
      import(
        './pages/reset-password-confirm-prompt/reset-password-confirm-prompt.module'
      ).then((m) => m.ResetPasswordConfirmPromptModule),
    data: {
      navbarState: NavbarState.OnlyLogo,
    },
  },
  {
    // TODO: Prevent access when not resetting password
    path: 'new',
    loadChildren: () =>
      import('./pages/new-password/new-password.module').then(
        (m) => m.NewPasswordModule
      ),
    //canActivate: [NewPasswordGuard],
    data: {
      navbarState: NavbarState.OnlyLogo,
    },
  },
  {
    // TODO: Prevent access when not resetting password
    path: 'success',
    loadChildren: () =>
      import('./pages/new-password-success/new-password-success.module').then(
        (m) => m.NewPasswordSuccessModule
      ),
    data: {
      navbarState: NavbarState.OnlyLogo,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordRoutingModule {}
