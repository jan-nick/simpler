import { NgModule } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { AuthEffects, AuthInterceptor, authReducer } from '@simpler/auth';
import { LibraryFileEffects, libraryFileReducer } from '@simpler/library-files';
import { CoreModule } from './core/core.module';
import { DateFnsModule } from 'ngx-date-fns';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { UIModule } from '@simpler/ui';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JsonDateInterceptor } from '@simpler/api';
import {
  LibraryFolderEffects,
  libraryFolderReducer,
} from '@simpler/library-folders';
import { UserEffects, userReducer } from '@simpler/users';
import { LibraryFilePlayEffects, libraryFilePlayReducer } from '@simpler/library-file-plays';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    DateFnsModule.forRoot(),
    EffectsModule.forRoot([
      AuthEffects,
      LibraryFileEffects,
      LibraryFolderEffects,
      LibraryFilePlayEffects,
      UserEffects,
    ]),
    HttpClientModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(allIcons),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new TranslateHttpLoader(http, '../assets/i18n/', '.json'),
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot({
      auth: authReducer,
      libraryFile: libraryFileReducer,
      libraryFolder: libraryFolderReducer,
      libraryFilePlay: libraryFilePlayReducer,
      router: routerReducer,
      user: userReducer,
    }),
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot(),
    UIModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JsonDateInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
