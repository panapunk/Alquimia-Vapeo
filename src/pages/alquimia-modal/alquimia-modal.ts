import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AlquimiaModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alquimia-modal',
  templateUrl: 'alquimia-modal.html',
})
export class AlquimiaModalPage {

  // Obtenemos el div de resultadoContenidoBases para mostrar y ocultar
  @ViewChild('resultadoContenidoBases') resultadoContenidoBases: ElementRef;
  // Obtenemos el div de resultadoContenidoNicotina para mostrar y ocultar
  @ViewChild('resultadoContenidoNicotina') resultadoContenidoNicotina: ElementRef;
  // Obtenemos el div de resultadoContenidoAromas para mostrar y ocultar
  @ViewChild('resultadoContenidoAromas') resultadoContenidoAromas: ElementRef;

  titlePage: string;
  basesLabelText: string;
  nicotinaLabelText: string;
  aromasLabelText: string;
  cantidadTotal: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl : ViewController) 
  {
    // Inicializamos arrays
    this.datosTabla = [ { texto : '', valor : 0, descripcion: '' } ];
    this.datosTabla.pop();
    this.datosTablaBases = [ { texto : '', valor : 0, descripcion: '' } ];
    this.datosTablaBases.pop();
    this.datosTablaNicotina = [ { texto : '', valor : 0, descripcion: '' } ];
    this.datosTablaNicotina.pop();
    this.datosTablaAromas = [ { texto : '', valor : 0, descripcion: '' } ];
    this.datosTablaAromas.pop();
  }

  /**
   * Cerrar este modal
   */
  closeModal(){
      this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.showConsoleLog('ionViewDidLoad AlquimiaModalPage');
    this.showConsoleLog(this.navParams.get('cantidadPG'));
    this.showConsoleLog(this.navParams.data);

    this.cargarDatosReceta(this.navParams.data);

  }

  /**
   * 
   * Cargamos los datos de la receta
   */
  datosTabla: any = {};
  totalTexto: string;
  totalValor: any;
  totalDescription: string;
  datosTablaBases: any = {};
  datosTablaNicotina: any = {};
  datosTablaAromas: any = {};
  cargarDatosReceta(datos) {

    this.showConsoleLog('datos pasados');
    this.showConsoleLog(datos);

    // let datoValor: Array<{texto: string , valor: number}>;
    let datoValor: any;
    
    if ( datos.titlePage != undefined && datos.titlePage != null && datos.titlePage != 0 ) {
      
      this.titlePage = datos.titlePage;
      this.basesLabelText = datos.labelBases;
      this.nicotinaLabelText = datos.labelNicotina;
      this.aromasLabelText = datos.labelAromas;

      if ( datos.cantidadTotal != undefined && datos.cantidadTotal != null && datos.cantidadTotal != 0 ) {
        this.cantidadTotal = datos.cantidadTotal;

        // cantidadPG
        datos.cantidadPG = Math.round(datos.cantidadPG * 100) / 100;
        datoValor = { texto: 'Base PG', valor: datos.cantidadPG, descripcion: datos.percentPG + '%' }
        this.datosTabla.push(datoValor);
        this.datosTablaBases.push(datoValor);

        // cantidadVG
        datos.cantidadVG = Math.round(datos.cantidadVG * 100) / 100;
        datoValor = { texto: 'Base VG', valor: datos.cantidadVG, descripcion: datos.percentVG + '%' };
        this.datosTabla.push(datoValor);
        this.datosTablaBases.push(datoValor);

        // NICOTINA
        if ( datos.resultadoCantidadNicotina != undefined && datos.resultadoCantidadNicotina != null && datos.resultadoCantidadNicotina != 0 ) {

          // cantidad Nicotina
          datos.resultadoCantidadNicotina = Math.round(datos.resultadoCantidadNicotina * 100) / 100;
          datoValor = { texto: 'Nc (' + datos.nicotinaBase + 'mg/ml)' , valor: datos.resultadoCantidadNicotina, descripcion: datos.nicotinaMezcla + 'mg/ml' }
          this.datosTabla.push(datoValor);
          this.datosTablaNicotina.push(datoValor);

        }
        else {
          // Ocultamos contenido de nicotina
          this.resultadoContenidoNicotina.nativeElement.style.display = 'none';
        }

        // AROMAS
        if ( datos.aromas != undefined && datos.aromas != null ) {

          datos.aromas.forEach(element => {
          
            // cantidad Nicotina
            datos.cantidad = Math.round(datos.cantidad * 100) / 100;
            datoValor = { texto: element.nombre, valor: element.cantidad, descripcion: element.porcentaje + '%' };
            this.datosTabla.push(datoValor);
            this.datosTablaAromas.push(datoValor);
          
          });

        }

        // Total
        // datos.cantidadTotal = Math.round(datos.cantidadTotal * 100) / 100;
        // datoValor = { texto: 'TOTAL', valor: datos.cantidadTotal, descripcion: '' };
        // this.datosTabla.push(datoValor);

        this.totalTexto = 'TOTAL';
        this.totalValor = Math.round(datos.cantidadTotal * 100) / 100;
        this.totalDescription = '';

      }
      else {

      }

    }
    else {

    }

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
