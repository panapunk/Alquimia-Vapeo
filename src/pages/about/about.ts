import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { Network } from '@ionic-native/network';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  enlaceLink: string = "https://telegra.ph/Alquima-Vapeo-09-17"
  // Obtenemos el id del item errorTitle para idiomas
  @ViewChild('variablesOcultas') variablesOcultas: ElementRef;

  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public InAppBrowserObj: InAppBrowser
            // ,public network: Network
              ) 
  {

    // entorno de trabajo
    this.getEntornoTrabajo();

    // network.onDisconnect().subscribe(() => {
    //   this.showConsoleLog('you are offline');
    //   alert('no');
    // });
    
    // network.onConnect().subscribe(()=> {
    //   this.showConsoleLog('you are online');
    //   alert('si');
    // });

  }

  ionViewDidLoad() {
    this.showConsoleLog('ionViewDidLoad AboutPage');
  }

  /**
   * Abrir enlace en inAppBrobser
   */
  openLink(enlace){
    // window.open(encodeURI(value), '_self', 'location=no');
    // this.InAppBrowserObj.create(this.getVariableOcultaValor(enlace),"_blank");
    this.InAppBrowserObj.create(encodeURI(this.getVariableOcultaValor(enlace)), '_system', 'location=no');
  }

  /**
   * Obtener valores de variables ocultas por key
   */
  getVariableOcultaValor(keyError){

    let resultado: string;

    let jsonObject: any = this.variablesOcultas.nativeElement.children;
    let objectLenght: any = this.variablesOcultas.nativeElement.children.length;
    let titleObtenido: string = '';
    while(objectLenght >= 1) {
      titleObtenido = jsonObject[objectLenght - 1].title;
      if ( titleObtenido == keyError ) {
        resultado = jsonObject[objectLenght - 1].innerText;
      }
      objectLenght = objectLenght - 1;
    }

    return resultado;
  }


  /**
   * 
   * Mostramos console log en función del entorno de trabajo
   * 
   * @param valor 
   */
  showConsoleLog(valor){
    if ( this.entornoTrabajo == '0'){
      console.log(valor);
    }
  }
  
  /**
   * Buscar entorno de trabajo en localsotraje
   */
  // Modo desarrollo o modo producción 0 = desarrollo 1 = producción 
  entornoTrabajo: string;
  getEntornoTrabajo(){
    this.entornoTrabajo = localStorage.getItem("entornoTrabajo");
    if ( this.entornoTrabajo != undefined && this.entornoTrabajo != null && this.entornoTrabajo == '1') {
      this.entornoTrabajo = '1';
    }
    else {
      this.entornoTrabajo = '0';
    }
  }

}
