import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// traductor
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Localstorage
// import { NativeStorage } from '@ionic-native/native-storage';

// header color
import { HeaderColor } from '@ionic-native/header-color';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Navegador
import { InAppBrowser } from '@ionic-native/in-app-browser';
// NetWork
// import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';
import { AlquimiaPage } from '../pages/alquimia/alquimia';
import { ResistenciasPage } from '../pages/resistencias/resistencias';
import { LoginPage } from '../pages/login/login';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { AboutPage } from '../pages/about/about';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    AlquimiaPage,
    ResistenciasPage,
    LoginPage,
    ConfiguracionPage,
    AboutPage
  ],
  imports: [
    // NativeStorage,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage,
    AlquimiaPage,
    ResistenciasPage,
    LoginPage,
    ConfiguracionPage,
    AboutPage
  ],
  providers: [
    // Network,
    InAppBrowser,
    StatusBar,
    SplashScreen,
    // NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HeaderColor
  ]
})
export class AppModule {}
