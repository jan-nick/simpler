import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard, SignedOutGuard } from '@simpler/auth';
import { NavbarState } from './core/components/navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [SignedOutGuard],
    data: {
      redirectToOnDeactivate: 'library',
    },
  },
  // Auth
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./pages/auth/pages/sign-in/sign-in.module').then(
        (m) => m.SignInModule
      ),
    canActivate: [SignedOutGuard],
    data: {
      redirectToOnDeactivate: 'library',
    },
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./pages/auth/pages/sign-up/sign-up.module').then(
        (m) => m.SignUpModule
      ),
    canActivate: [SignedOutGuard],
    data: {
      redirectToOnDeactivate: 'library',
    },
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./pages/auth/pages/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordModule
      ),
  },
  // Signed in App
  {
    path: 'file',
    loadChildren: () =>
      import('./pages/file-detail/file-detail.module').then(
        (m) => m.FileDetailModule
      ),
    data: {
      redirectToOnDeactivate: 'sign-in',
      navbarState: NavbarState.DetermineFromAuth,
    },
  },
  {
    path: 'library',
    loadChildren: () =>
      import('./pages/library/library.module').then((m) => m.LibraryModule),
    canActivate: [SignedInGuard],
    data: {
      redirectToOnDeactivate: 'sign-in',
      navbarState: NavbarState.LoggedIn,
    },
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./pages/settings/settings.module').then((m) => m.SettingsModule),
    canActivate: [SignedInGuard],
    data: {
      redirectToOnDeactivate: 'sign-in',
      navbarState: NavbarState.LoggedIn,
    },
  },
  // Miscellaneous
  {
    path: 'terms-of-service',
    loadChildren: () =>
      import(
        './pages/miscellaneous/pages/terms-of-service/terms-of-service.module'
      ).then((m) => m.TermsOfServiceModule),

    data: {
      navbarState: NavbarState.OnlyLogo,
    },
  },
  {
    path: 'imprint',
    loadChildren: () =>
      import('./pages/miscellaneous/pages/imprint/imprint.module').then(
        (m) => m.ImprintModule
      ),
    data: {
      navbarState: NavbarState.OnlyLogo,
    },
  },
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import(
        './pages/miscellaneous/pages/privacy-policy/privacy-policy.module'
      ).then((m) => m.PrivacyPolicyModule),

    data: {
      navbarState: NavbarState.OnlyLogo,
    },
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/miscellaneous/pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
    data: {
      navbarState: NavbarState.OnlyLogo,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
