import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarState } from '../../../../core/components/navbar/navbar.component';
import { SignUpComponent } from './sign-up.component';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  {
    // TODO: Prevent access when not in signup process
    path: 'confirm',
    loadChildren: () =>
      import('./pages/email-confirm-prompt/email-confirm-prompt.module').then(
        (m) => m.EmailConfirmPromptModule
      ),
    data: {
      navbarState: NavbarState.OnlyLogo,
    },
  },
  {
    // TODO: Prevent access when not in signup process
    path: 'success',
    loadChildren: () =>
      import('./pages/email-confirm-success/email-confirm-success.module').then(
        (m) => m.EmailConfirmSuccessModule
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
export class SignUpRoutingModule {}
