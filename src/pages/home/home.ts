import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  idioms: any[] = [];

  constructor(
    public navCtrl: NavController,
    private translateService: TranslateService
  ) {

    this.idioms = [
      {
        value: 'es',
        label: 'Español'
      },
      {
        value: 'en',
        label: 'Ingles'
      },
      {
        value: 'pt',
        label: 'Portugués'
      }
    ];

  }

  /**
   * Cambiar idioma
   * @param lang 
   */
  choose(lang) {
    this.translateService.use(lang);
  }

}
