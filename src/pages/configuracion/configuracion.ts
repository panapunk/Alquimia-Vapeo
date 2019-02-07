import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/Rx';

/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  idioms: any[] = [];
  theme: BehaviorSubject<String>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private translateService: TranslateService
  ) {

    this.idioms = [
      {
        value: 'es',
        label: 'Español'
      }
      ,
      {
        value: 'en',
        label: 'Ingles'
      }
      // ,
      // {
      //   value: 'pt',
      //   label: 'Portugués'
      // }
    ];

  }

  /**
   * Cambiar idioma
   * @param lang 
   */
  choose(lang) {
    this.translateService.use(lang);
    localStorage.setItem('idioma', lang);
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ConfiguracionPage');
  // }

  themeChangeToggle(event){

    console.log(event);

    if ( event == true ) {
      this.theme = new BehaviorSubject('ionic.theme.default');
      this.setActiveTheme('ionic.theme.default');
    }
    else {
      this.theme = new BehaviorSubject('ionic.theme.dark');
      this.setActiveTheme('ionic.theme.dark');
    }

    console.log(this.getActiveTheme());

  }
 
  setActiveTheme(val) {
    this.theme.next(val);
  }

  getActiveTheme() {
    return this.theme.asObservable();
  }

  /**
   * Detectamos y actuamos ante el cambio de idioma
   */
  idiomaChange(evento) {



  }

}
