import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController, Content } from 'ionic-angular';
// Localstorage secure
// import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the AlquimiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var sha1: any;
declare var md5: any;

@IonicPage()
@Component({
  selector: 'page-alquimia',
  templateUrl: 'alquimia.html',
})
export class AlquimiaPage {

  // Obtenemos el div de nicotinaContent para mostrar y ocultar
  @ViewChild('nicotinaContent') nicotinaContent: ElementRef;
  // Obtenemos el id del item errorTitle para idiomas
  @ViewChild('errorTitleId') errorTitleId: ElementRef;
  // Obtenemos el id del item formAromasAdd para idiomas
  @ViewChild('formAromasAdd') formAromasAdd: ElementRef;
  // Obtenemos el id del item alqCardAromaInputNombreId para poner el foco
  @ViewChild('alqCardAromaInputNombreId') alqCardAromaInputNombreId: ElementRef;
  // Span de form aromas más menos
  @ViewChild('spanIconAdd') spanIconAdd: ElementRef;
  @ViewChild('spanIconRemove') spanIconRemove: ElementRef;
  // Botón inferior de acciones
  @ViewChild('alqBottomAcciones') alqBottomAcciones: ElementRef;

  // flotanteDiv
  @ViewChild('alquimiaContentElementosConfig') alquimiaContentElementosConfig: ElementRef;
  @ViewChild(Content) alquimiaContentElementosConfigContent: Content;
  @ViewChild('flotanteDiv') flotanteDiv: ElementRef;
  @ViewChild('itemCardFlotanteNicotina') itemCardFlotanteNicotina: ElementRef;

  // Propiedad con valores en localstorage
  alquimiaLocalStorage: any = {};

  // TOTAL
  cantidadTotal: number;
  percentTotal: number;
  vgPercentTotal: number;
  pgPercentTotal: number;
  vgPercentTotalText: string;
  pgPercentTotalText: string;

  // NICOTINA
  cantidadNicotinaFinal: number;
  cantidadNicotinaBase: number;
  cantidadNicotinaPGBase: number;
  nicotinaToggle: any;
  percentNicotina: number;
  vgPercentNicotina: number;
  pgPercentNicotina: number;
  vgPercentNicotinaText: string;
  pgPercentNicotinaText: string;

  // AROMAS
  aromas: Array<{idAroma: number, nombreAroma: string , cantidadAroma: number, cantidadPGBase: number}>;
  alqCardAromaInputNombre: any;
  alqCardAromaInputCantidad: number;
  alqCardAromaInputPG: number;

  // Variables del resultado
  resultadoAromas: Array<{nombre: string , porcentaje: number, cantidad: number }>;
  resultadoCalculado: any;
  // resultadoAromas: any = {};
  // resultadoCalculado: any = {};

  /**
   * Objeto para bases usadas
   * 
   * Más objeto para ir dando de alta cada base
   * 
   */
  objBases: any = [];
  objBaseThis: any = [];

  /**
   * Textos formualrio add objetos cardFlotante
   */
  tipoObjetoAddCardFlotante: string = 'aroma';
  titleCardFlotanteTexto: string = 'Propiedades del componente';
  nombreCardFlotanteTexto: string = 'Nombre Base';
  nombreCardFlotanteValor: string;
  cantidadMaxCardFlotanteTexto: string = 'cantidad máx disponible';
  cantidadMaxCardFlotanteValor: number;
  PGporcentajeCardFlotanteTexto: string = 'PG 50%';
  PGporcentajeCardFlotanteValor: number;
  VGporcentajeCardFlotanteTexto: string = 'VG 50%';
  VGporcentajeCardFlotanteValor: number;

  PGrangeCardFlotanteTexto: string = 'PG 50%';
  VGrangeCardFlotanteTexto: string = 'VG 50%';
  PGrangeCardFlotanteValor: number = 50;
  VGrangeCardFlotanteValor: number = 50;
  rangeCardFlotanteValor: number = 50;

  nicotinaCardFlotanteTexto: string = 'Nicotina(mg/ml)';
  nicotinaCardFlotanteValor: number;
  botonCardFlotante: string = 'Añadir Base';
  iconBotonCardFlotante: string = 'add-circle';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private rd: Renderer2
    // private nativeStorage: NativeStorage
  ) {

    // entorno de trabajo
    this.getEntornoTrabajo();

    // Inicializamos arrays AROMAS y RESULTADO AROMAS
    this.aromas = [
      { idAroma: 0, nombreAroma: '', cantidadAroma: null, cantidadPGBase: 0 }
    ];
    this.aromas.pop();
    this.resultadoAromas = [
      { nombre: '', cantidad: null, porcentaje: 0 }
    ];
    this.resultadoAromas.pop();

    /**
     * Pruebas objBases
     */
    this.objBaseThis.nombre = 'PG';
    this.objBaseThis.pgPorcentaje = 100;
    this.objBaseThis.vgPorcentaje = 0;
    this.objBaseThis.nicotina = 0;
    this.objBaseThis.cantidadDisponible = 0;
    this.objBaseThis.precio = 2.40;
    // this.objBaseThis = {
    //   nombre: 'PG',
    //   pgPorcentaje: 100,
    //   vgPorcentaje: 0,
    //   nicotina: 0,
    //   cantidadDisponible: 0,
    //   precio: 2.40
    // };
    this.objBases.push(this.objBaseThis);

    // this.objBaseThis.nombre = 'VG';
    // this.objBaseThis.pgPorcentaje = 0;
    // this.objBaseThis.vgPorcentaje = 100;
    // this.objBaseThis.nicotina = 0;
    // this.objBaseThis.cantidadDisponible = 0;
    // this.objBaseThis.precio = 2.40;
    this.objBaseThis = {
      nombre: 'VG',
      pgPorcentaje: 0,
      vgPorcentaje: 100,
      nicotina: 0,
      cantidadDisponible: 0,
      precio: 2.40
    };
    this.objBases.push(this.objBaseThis);

    // this.objBaseThis.nombre = 'NIC';
    // this.objBaseThis.pgPorcentaje = 50;
    // this.objBaseThis.vgPorcentaje = 50;
    // this.objBaseThis.nicotina = 20;
    // this.objBaseThis.cantidadDisponible = 30;
    // this.objBaseThis.precio = 3;
    this.objBaseThis = {
      nombre: 'NIC',
      pgPorcentaje: 50,
      vgPorcentaje: 50,
      nicotina: 20,
      cantidadDisponible: 0,
      precio: 3
    };
    this.objBases.push(this.objBaseThis);

    this.showConsoleLog(this.objBases);

    
    // Recorremos array para ver si existe con este nombre
    this.objBases.forEach(element => {
      
      this.showConsoleLog(element);

      this.showConsoleLog(element.nombre);

    });

    this.showConsoleLog(sha1(JSON.stringify(this.objBases)));
    this.showConsoleLog(md5(JSON.stringify(this.objBases)));
    this.showConsoleLog(sha1(md5(JSON.stringify(this.objBases))));

  }

  // Acciones a la carga de la página
  ionViewDidLoad() {
    // this.showConsoleLog('ionViewDidLoad AlquimiaPage');
    // Iniciamos con valores guardados en localstorage
    setTimeout(() => {
      this.cargaValoresLocalStorage();
    }, 100);
  }

  /**
   * Obtener valores guardados en localstorage
   */
  cargaValoresLocalStorage(){

    let valor: any = localStorage.getItem("alquimiaLocalStorage");
    // if ( localStorage.getItem("alquimiaLocalStorage") != undefined && localStorage.getItem("alquimiaLocalStorage") != null && localStorage.getItem("alquimiaLocalStorage") != ''){
    if ( valor != undefined && valor != null && valor != '') {

      this.showConsoleLog('string');
      this.showConsoleLog(valor);

      valor = JSON.parse(valor);
      this.showConsoleLog('objeto');
      this.showConsoleLog(valor);
      this.alquimiaLocalStorage = valor;

      // totalValor
      if ( valor.totalValor != undefined && valor.totalValor != null && valor.totalValor != '' ){
        this.cantidadTotal = valor.totalValor;
      }

      // this.vgPercentTotal
      // this.pgPercentTotal
      if ( valor.vgPercentTotal != undefined && valor.vgPercentTotal != null && valor.vgPercentTotal != '' ){
        
        if ( valor.pgPercentTotal != undefined && valor.pgPercentTotal != null && valor.pgPercentTotal != '' ){
          
          this.percentTotal = valor.vgPercentTotal;
          this.vgPercentTotal = valor.vgPercentTotal;
          this.pgPercentTotal = valor.pgPercentTotal;
          this.vgPercentTotalText = this.vgPercentTotal + "%";
          this.pgPercentTotalText = this.pgPercentTotal + "%";

        }

      }

      // cantidadNicotinaFinal
      if ( valor.cantidadNicotinaFinal != undefined && valor.cantidadNicotinaFinal != null && valor.cantidadNicotinaFinal != 0 ){
        this.cantidadNicotinaFinal = valor.cantidadNicotinaFinal;
      }

      // cantidadNicotinaBase
      if ( valor.cantidadNicotinaBase != undefined && valor.cantidadNicotinaBase != null && valor.cantidadNicotinaBase != 0 ){
        this.cantidadNicotinaBase = valor.cantidadNicotinaBase;
      }

      // cantidadNicotinaPGBase
      if ( valor.cantidadNicotinaPGBase != undefined && valor.cantidadNicotinaPGBase != null && valor.cantidadNicotinaPGBase != 0 ){
        this.cantidadNicotinaPGBase = valor.cantidadNicotinaPGBase;
      }

      // nicotinaToggle
      if ( valor.nicotinaToggle != undefined && valor.nicotinaToggle != null && valor.nicotinaToggle != '' ){

        if ( valor.nicotinaToggle == 'true' ) {
          this.nicotinaToggle = true;
        }
        else {
          this.nicotinaToggle = false;
        }
        this.nicotinaChangeToggle(this.nicotinaToggle, 0);

      }

      // aromas
      // if ( valor.aromas != undefined && valor.aromas != null && valor.aromas != '' ){
        // this.cantidadNicotinaBase.aromas = JSON.parse(valor.aromas);
        // this.cantidadNicotinaBase.aromas = valor.aromas;
      // }

    }

    if ( localStorage.getItem("alquimiaLocalStorageAromas") != undefined && localStorage.getItem("alquimiaLocalStorageAromas") != null && localStorage.getItem("alquimiaLocalStorageAromas") != ''){

      this.aromas = JSON.parse(localStorage.getItem("alquimiaLocalStorageAromas"));
      // Ocultamos form aromas
      this.showHiddenFormAddAromaNew(0);
    
    }
    else {
      // Ocultamos form aromas
      this.showHiddenFormAddAromaNew(1);

    }
    

  }
  
  /**
   * Detectando cambio valor total
   */
  totalChangeInput() {
    this.alquimiaLocalStorage.totalValor = this.cantidadTotal;
    localStorage.setItem("alquimiaLocalStorage", JSON.stringify(this.alquimiaLocalStorage));
    // this.showConsoleLog(localStorage.getItem("alquimiaLocalStorage"));
  }

  /**
   * Cardflotante abrir cerrar
   */
  openCardFlotante(event) {
    this.showConsoleLog(event);
    this.rd.removeClass(this.flotanteDiv.nativeElement, 'outOfScreen');
    this.rd.addClass(this.alquimiaContentElementosConfig.nativeElement, 'outOfScreen');
  }
  
  scrollBottom: number = 0;
  scrollBottomTime: number = 1000;
  closeCardFlotante(event) {
    this.showConsoleLog(event);
    this.rd.addClass(this.flotanteDiv.nativeElement, 'outOfScreen');
    this.rd.removeClass(this.alquimiaContentElementosConfig.nativeElement, 'outOfScreen');

    if ( this.scrollBottom != 0 ) {
      this.alquimiaContentElementosConfigContent.scrollToBottom(this.scrollBottomTime);
    }
    this.scrollBottom = 0;
  }

  openCardFlotanteToAromas(){
    this.tipoObjetoAddCardFlotante = 'aroma';
    this.titleCardFlotanteTexto = this.getErrorTitleId('alqCardAromasTitleAdd');
    this.nombreCardFlotanteTexto = this.getErrorTitleId('alqCardAromasInputNombreLabel');
    this.nombreCardFlotanteValor = '';
    this.cantidadMaxCardFlotanteTexto = this.getErrorTitleId('alqCardAromasInputCantidadLabel');
    this.cantidadMaxCardFlotanteValor = null;
    this.botonCardFlotante = this.getErrorTitleId('alqCardAromasButonLabel');
    this.rangeCardFlotanteValor = 100;
    this.VGporcentajeCardFlotanteValor = 100;
    this.PGporcentajeCardFlotanteValor = 0;
    this.PGporcentajeCardFlotanteTexto = 'PG 100%';
    this.VGporcentajeCardFlotanteTexto = 'VG 0%';
    // this.rd.addClass(this.itemCardFlotanteNicotina.nativeElement, 'hidden');
    this.rd.addClass(this.itemCardFlotanteNicotina.nativeElement, 'outOfScreen');
    this.openCardFlotante(1);
    this.scrollBottom = 1;
  }

  /**
   * Detectando cambios en el range total
   * @param event 
   */
  changeRangeCardFlotante(event){
    this.PGporcentajeCardFlotanteValor = this.rangeCardFlotanteValor;
    this.VGporcentajeCardFlotanteValor = 100 - this.PGporcentajeCardFlotanteValor;
    this.VGporcentajeCardFlotanteTexto = 'VG ' + this.VGporcentajeCardFlotanteValor + "%";
    this.PGporcentajeCardFlotanteTexto = 'PG ' + this.PGporcentajeCardFlotanteValor + "%";

    // this.alquimiaLocalStorage.vgPercentTotal = this.percentTotal;
    // this.alquimiaLocalStorage.pgPercentTotal = 100 - this.percentTotal;
    
    // localStorage.setItem("alquimiaLocalStorage", JSON.stringify(this.alquimiaLocalStorage));
  }

  /**
   * Detectando cambios en el range total
   * @param event 
   */
  totalChangeRange(event){
    this.vgPercentTotal = this.percentTotal;
    this.pgPercentTotal = 100 - this.percentTotal;
    this.vgPercentTotalText = this.percentTotal + "%";
    this.pgPercentTotalText = 100 - this.percentTotal + "%";

    this.alquimiaLocalStorage.vgPercentTotal = this.percentTotal;
    this.alquimiaLocalStorage.pgPercentTotal = 100 - this.percentTotal;
    
    localStorage.setItem("alquimiaLocalStorage", JSON.stringify(this.alquimiaLocalStorage));
  }

  /**
   * Detectando cambios en el toggle de nicotina
   */
  nicotinaChangeToggle(event, cargar = 1){
    if (this.nicotinaToggle == true) {
      // this.nicotinaContent.nativeElement.style.display = 'block';
      this.rd.removeClass(this.nicotinaContent.nativeElement, 'outOfScreen');
      this.alquimiaLocalStorage.nicotinaToggle = 'true';
    }
    else {
      // this.nicotinaContent.nativeElement.style.display = 'none';
      this.rd.addClass(this.nicotinaContent.nativeElement, 'outOfScreen');
      this.alquimiaLocalStorage.nicotinaToggle = 'false';
    }

    if ( cargar == 1 ) {
      localStorage.setItem("alquimiaLocalStorage", JSON.stringify(this.alquimiaLocalStorage));
    }
  }

  /**
   * Cambios de valores nicotina
   */
  cantidadNicotinaFinalChange(event){
    // this.showConsoleLog(event);
    this.alquimiaLocalStorage.cantidadNicotinaFinal = this.cantidadNicotinaFinal;
    localStorage.setItem("alquimiaLocalStorage", JSON.stringify(this.alquimiaLocalStorage));
  }
  cantidadNicotinaBaseChange(event){
    // this.showConsoleLog(event);
    this.alquimiaLocalStorage.cantidadNicotinaBase = this.cantidadNicotinaBase;
    localStorage.setItem("alquimiaLocalStorage", JSON.stringify(this.alquimiaLocalStorage));
  }
  cantidadNicotinaPGBaseChange(event){
    // this.showConsoleLog(event);
    this.alquimiaLocalStorage.cantidadNicotinaPGBase = this.cantidadNicotinaPGBase;
    localStorage.setItem("alquimiaLocalStorage", JSON.stringify(this.alquimiaLocalStorage));
  }

  /**
   * Detetando cambios en el range nicotina
   * @param event 
   */
  nicotinaChangeRange(event){
    this.vgPercentNicotinaText = this.percentNicotina + "%";
    this.pgPercentNicotinaText = 100 - this.percentNicotina + "%";
    // Guardar en localStorage
    this.alquimiaLocalStorage.percentNicotina = this.percentNicotina;
    this.alquimiaLocalStorage.vgPercentNicotina = this.vgPercentNicotina;
    this.alquimiaLocalStorage.pgPercentNicotina = this.pgPercentNicotina;
    localStorage.setItem("alquimiaLocalStorage", JSON.stringify(this.alquimiaLocalStorage));
  }

  /**
   * Añadir nuevo aroma
   */
  addAromaNew(event){

    // Inicializamos variable de control
    let cantidadAromas: number = 0;
    let aromaEncontrado: number = 0;
    let errorTitle: string = '';
    let errorTime: any = 0;
    let caracteresMinNombreAroma: number = 3;

    // Si se han recibido valores
    if ( this.nombreCardFlotanteValor != undefined && this.nombreCardFlotanteValor != null && this.nombreCardFlotanteValor != ''
      && this.cantidadMaxCardFlotanteValor != undefined && this.cantidadMaxCardFlotanteValor != null && this.cantidadMaxCardFlotanteValor != 0
      && this.rangeCardFlotanteValor != undefined && this.rangeCardFlotanteValor != null && this.rangeCardFlotanteValor != 0 ){

        if ( this.nombreCardFlotanteValor.length >= caracteresMinNombreAroma ){

          // Recorremos array para ver si existe con este nombre
          this.aromas.forEach(element => {
            cantidadAromas += 1;
            if ( this.nombreCardFlotanteValor == element.nombreAroma ) { // && this.alqCardAromaInputCantidad == element.cantidadAroma ){
              aromaEncontrado = 1;
            }
          });

          // Si no se ha añadido antes
          if ( aromaEncontrado !== 1 ) {
            let newAroma: any;
            let idAromaThis: number = cantidadAromas + 1;
            newAroma = { 
              idAroma: idAromaThis, 
              nombreAroma: this.nombreCardFlotanteValor, 
              cantidadAroma: this.cantidadMaxCardFlotanteValor, 
              cantidadPGBase: this.rangeCardFlotanteValor 
            };
            this.aromas.push(newAroma);
            this.inicializaAromasForm();
            // Ocultamos form aromas
            this.showHiddenFormAddAromaNew(0);
            localStorage.setItem("alquimiaLocalStorageAromas", JSON.stringify(this.aromas));
            // Cerramos cardFlotante
            this.closeCardFlotante(1);
          }
          else {
            errorTitle = 'Error, El aroma ya existe, no se añade';
            errorTitle = this.getErrorTitleId('alqCardAromaErrorExiste');
            errorTime = 3000;
          }

        }
        else {
          errorTitle = 'Error, nombre demasiado corto, mínimo '+caracteresMinNombreAroma+' caracteres';
          errorTime = 3000;
        }

    }
    else {
      errorTitle = 'Error, no se han recibido valores para añadir';
      errorTitle = this.getErrorTitleId('alqCardAromaErrorSinValores');
      errorTime = 3000;
    }

    // SI han abido errores
    if ( errorTitle !== '' ) {
      this.errorToast(errorTitle, errorTime);
    }

  }

  /**
   * Inicializa form aromas
   */
  inicializaAromasForm(){
    this.alqCardAromaInputNombre = null;
    this.alqCardAromaInputCantidad = null;
  }

  /**
   * Editar aroma
   */
  editarAroma(event){

    this.showConsoleLog(event);
    // let posicionArray: number = 1;
    // let count: number = 0;
    // // Recorremos array
    // this.aromas.forEach(element => {
    //   count += 1;
    //   if ( event.idAroma == element.idAroma ) {
    //     posicionArray = count;
    //   }
    // });

    let alert = this.alertCtrl.create({
      title: 'Editar aroma',
      inputs: [
        {
          // label: 'nombreAroma',
          name: 'nombreAroma',
          placeholder: event.nombreAroma,
          // value: event.nombreAroma
        },
        {
          // label: 'nombreAroma',
          name: 'cantidadAroma',
          placeholder: event.cantidadAroma,
          // value: event.cantidadAroma
          // type: 'password'
        },
        {
          // label: 'nombreAroma',
          name: 'PG(%)',
          placeholder: event.cantidadPGBase,
          // value: event.cantidadPGBase
          // type: 'password'
        }
      ],
      buttons: [
        // {
        //   text: 'Cancelar',
        //   role: 'cancel',
        //   handler: data => {
        //     this.showConsoleLog('Cancel clicked');
        //   }
        // },
        {
          text: 'Guardar',
          role: 'guardar',
          handler: data => {
            this.showConsoleLog('Guardamos valores');
            this.showConsoleLog(alert.data.inputs[0].value);
            this.showConsoleLog(alert.data.inputs[1].value);
            this.showConsoleLog(alert.data.inputs[2].value);
            // this.modificarAromaToArray(event);

            if ( alert.data.inputs[0].value == '' ) {
              alert.data.inputs[0].value = event.nombreAroma;
            }
            if ( alert.data.inputs[1].value == '' ) {
              alert.data.inputs[1].value = event.cantidadAroma;
            }
            if ( alert.data.inputs[2].value == '' ) {
              alert.data.inputs[2].value = event.cantidadPGBase;
            }

            let aromaEdit: any = { 
              idAroma: event.idAroma, 
              nombreAroma: alert.data.inputs[0].value, 
              cantidadAroma: alert.data.inputs[1].value, 
              cantidadPGBase: alert.data.inputs[2].value 
            };
            this.aromas[event.idAroma - 1] = aromaEdit;
            localStorage.setItem("alquimiaLocalStorageAromas", JSON.stringify(this.aromas));
          }
        },
        {
          text: 'Eliminar',
          cssClass: 'alertButtonDanger',
          handler: data => {
            this.delAromaToArray(event);
          }
        }
      ]
    });
    alert.present();

  }

  /**
   * Quitamos aroma del array
   */
  modificarAromaToArray(valoresViejos, valoresNuevos){
    // this.showConsoleLog(event);
    let itemNumber: any = 0;
    let count: any = 0;
    this.aromas.forEach(element => {
      // if ( event.nombreAroma == element.nombreAroma && event.cantidadAroma == element.cantidadAroma ){
      if ( valoresViejos.idAroma == element.idAroma ) { // && event.cantidadAroma == element.cantidadAroma ){
        itemNumber = count;
      }
    count = count + 1;
    });
    this.aromas.splice(itemNumber, 1);
    // Actualizamos locaStorage Aromas
    localStorage.setItem("alquimiaLocalStorageAromas", JSON.stringify(this.aromas));
  }

  /**
   * Quitamos aroma del array
   */
  delAromaToArray(event){
    // this.showConsoleLog(event);
    let itemNumber: any = 0;
    let count: any = 0;
    this.aromas.forEach(element => {
      // if ( event.nombreAroma == element.nombreAroma && event.cantidadAroma == element.cantidadAroma ){
      if ( event.idAroma == element.idAroma ) { // && event.cantidadAroma == element.cantidadAroma ){
        itemNumber = count;
      }
    count = count + 1;
    });
    this.aromas.splice(itemNumber, 1);
    // Actualizamos locaStorage Aromas
    localStorage.setItem("alquimiaLocalStorageAromas", JSON.stringify(this.aromas));
  }

  /**
   * Añadir nuevo aroma
   */
  buscarAromaNombre(event){
    this.showConsoleLog(event);
  }

  /**
   * Errores toast
   */
  errorToast(texto, tiempo){

    let toast = this.toastCtrl.create({
      message: texto,
      duration: tiempo
    });
    toast.present();

    this.showConsoleLog(this.errorTitleId);

  }

  /**
   * Generamos alert simple
   */
  generarAlert(titleThis, subtitleThis, butonsThis){
    // butonsThis: any = ['accion', 'accion2'];
    let alert = this.alertCtrl.create({
      title: titleThis,
      subTitle: subtitleThis,
      buttons: butonsThis
    });
    alert.present();
  }

  /**
   * Obtener Mensaje error de errorTitleId
   */
  getErrorTitleId(keyError){

    let resultado: string;

    let jsonObject: any = this.errorTitleId.nativeElement.children;
    let objectLenght: any = this.errorTitleId.nativeElement.children.length;
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
   * Mostramos form add Aroma
   */
  showHiddenFormAddAromaNew(accion){
    // if (accion == 1){
    //   this.formAromasAdd.nativeElement.style.display = 'block';
    //   this.spanIconAdd.nativeElement.style.display = 'none';
    //   this.spanIconRemove.nativeElement.style.display = 'block';
    // }
    // else {
    //   this.formAromasAdd.nativeElement.style.display = 'none';
    //   this.spanIconAdd.nativeElement.style.display = 'block';
    //   this.spanIconRemove.nativeElement.style.display = 'none';
    // }
  }




  /**
   * CALCULAMOS RESULTADOS
   */
   lastCantidadTotal_: number;
  calcularValores_(event){

    // Variable para errores
    let errorTitle: string = '';
    let errorTime: any = 3000;
    let datosToModal: any = {};

    let pgValorCalculado: number = 0;
    let vgValorCalculado: number = 0;
    let valorVariable: number = 0;
    let cantidadLiquidoVariable: number = 0;

    // Si se ha introducido valor total
    if ( this.cantidadTotal != undefined && this.cantidadTotal != null && this.cantidadTotal != 0) {

      datosToModal.cantidadTotal = this.cantidadTotal;

      // Inicializamos resultadoAromas
      this.resultadoAromas = [
        { nombre: '', cantidad: null, porcentaje: 0 }
      ];
      this.resultadoAromas.pop();
      let cantidadTotalSinAromas: number;
      cantidadTotalSinAromas = this.cantidadTotal;
      if ( this.aromas != undefined && this.aromas != null && this.aromas.length >= 1){

        // Calcular valores de aromas
        let valoresAromaThis: any;
        let nombrethis: string;
        let porcentajethis: number;
        let cantidadthis: number;
        this.aromas.forEach(element => {

          // Calculamos aroma
          nombrethis = element.nombreAroma;
          porcentajethis = element.cantidadAroma;
          // cálculo caso 3
          cantidadthis = this.calcularReglaTres(this.cantidadTotal, 100, 'x', element.cantidadAroma, 'directa');

          valoresAromaThis = { nombre: nombrethis, porcentaje: porcentajethis, cantidad: cantidadthis};
          this.resultadoAromas.push(valoresAromaThis);

          // Calculando total
          cantidadTotalSinAromas = cantidadTotalSinAromas - cantidadthis;
          this.showConsoleLog('cantidad total: ');
          this.showConsoleLog(cantidadTotalSinAromas);

          // Calculamos el pg - vg del aroma
          if ( element.cantidadPGBase != undefined && element.cantidadPGBase != null && element.cantidadPGBase <= 100 && element.cantidadPGBase >= 1 ) {
            valorVariable = this.calcularReglaTres(Number(element.cantidadAroma), 'x', 100, Number(element.cantidadPGBase));
            pgValorCalculado = Number(pgValorCalculado) + Number(valorVariable);
            vgValorCalculado = Number(vgValorCalculado) + (Number(element.cantidadAroma) - Number(valorVariable));
            cantidadLiquidoVariable = Number(cantidadLiquidoVariable) + Number(cantidadthis);
            // this.showConsoleLog(element.nombreAroma);
            // this.showConsoleLog('PG calculado');
            // this.showConsoleLog(pgValorCalculado);
            // this.showConsoleLog('VG calculado');
            // this.showConsoleLog(vgValorCalculado);
            // this.showConsoleLog('cantidad calculado');
            // this.showConsoleLog(cantidadLiquidoVariable);
          }

        });
        
        // Validación de control tras cálculo aromas
        if ( cantidadTotalSinAromas < this.cantidadTotal ) {

          // Resultado
          datosToModal.aromas = this.resultadoAromas;

          /**
           * CÄLCULOS PARA NICOTINA OPCIONAL
           */
          let resultadoCantidadNicotina: number;
          if (this.nicotinaToggle == true) {

            if ( this.cantidadNicotinaFinal != undefined && this.cantidadNicotinaFinal != null && this.cantidadNicotinaFinal != 0 ) {

              if ( this.cantidadNicotinaBase != undefined && this.cantidadNicotinaBase != null && this.cantidadNicotinaBase != 0 ) {

                resultadoCantidadNicotina = this.cantidadNicotinaFinal * this.cantidadTotal / this.cantidadNicotinaBase;
                resultadoCantidadNicotina = Math.round(resultadoCantidadNicotina * 100) / 100;
                this.showConsoleLog('Cantidad nicotina ml');
                this.showConsoleLog(resultadoCantidadNicotina);

                cantidadTotalSinAromas = cantidadTotalSinAromas - resultadoCantidadNicotina;
                cantidadTotalSinAromas = Math.round(cantidadTotalSinAromas * 100) / 100;
                this.showConsoleLog('Cantidad total resto');
                this.showConsoleLog(cantidadTotalSinAromas);
                
                // Resultado
                datosToModal.resultadoCantidadNicotina = resultadoCantidadNicotina;
                datosToModal.nicotinaBase = this.cantidadNicotinaBase;
                datosToModal.nicotinaMezcla = this.cantidadNicotinaFinal;

                // Calculamos el pg - vg del aroma
                if ( this.cantidadNicotinaPGBase != undefined && this.cantidadNicotinaPGBase != null && this.cantidadNicotinaPGBase <= 100 && this.cantidadNicotinaPGBase >= 1 ) {
                  valorVariable = this.calcularReglaTres(Number(resultadoCantidadNicotina), 'x', 100, Number(this.cantidadNicotinaPGBase));
                  pgValorCalculado = Number(pgValorCalculado) + Number(valorVariable);
                  vgValorCalculado = Number(vgValorCalculado) + (Number(resultadoCantidadNicotina) - Number(valorVariable));
                  cantidadLiquidoVariable = Number(cantidadLiquidoVariable) + Number(resultadoCantidadNicotina);
                  // this.showConsoleLog('PG calculado');
                  // this.showConsoleLog(pgValorCalculado);
                  // this.showConsoleLog('VG calculado');
                  // this.showConsoleLog(vgValorCalculado);
                  // this.showConsoleLog('cantidad calculado');
                  // this.showConsoleLog(cantidadLiquidoVariable);
                }
                
              }
              else {
                // ERROR cantidad nicotina Base no introducida
              }

            }
            else {
              // ERROR cantidad nicotina no introducida
            }

          }

          // CALCULO FINAL
          // let cantidadTotalParaCalcular: number;
          pgValorCalculado = Math.round(pgValorCalculado * 100) / 100;
          vgValorCalculado = Math.round(vgValorCalculado * 100) / 100;
          cantidadLiquidoVariable = Math.round(cantidadLiquidoVariable * 100) / 100;

          this.showConsoleLog('PG calculado');
          this.showConsoleLog(pgValorCalculado);
          this.showConsoleLog('VG calculado');
          this.showConsoleLog(vgValorCalculado);
          this.showConsoleLog('cantidad calculado');
          this.showConsoleLog(cantidadLiquidoVariable);

          let pgTotal: number = this.calcularReglaTres(Number(this.cantidadTotal),'x', 100, Number(this.pgPercentTotal));
          let vgTotal: number = this.calcularReglaTres(Number(this.cantidadTotal),'x', 100, Number(this.vgPercentTotal));
          let pgResto: number = pgTotal - pgValorCalculado;
          let vgResto: number = vgTotal - vgValorCalculado;

          let cantidadPG: number = pgResto;
          // cantidadTotalSinAromas = Math.round(cantidadTotalSinAromas * 100) / 100;
          // this.showConsoleLog('Cantidad total resto ROUND');
          // this.showConsoleLog(cantidadTotalSinAromas);

          // cantidadPG = this.calcularReglaTres(cantidadTotalSinAromas, 100, 'x', this.pgPercentTotal);
          // this.showConsoleLog('Cantidad total PG');
          // this.showConsoleLog(cantidadPG);

          let cantidadVG: number = vgResto;
          // cantidadVG = cantidadTotalSinAromas - cantidadPG;
          // this.showConsoleLog('Cantidad total VG');
          // this.showConsoleLog(cantidadVG);

          // Resultado
          datosToModal.cantidadPG = cantidadPG;
          datosToModal.percentPG = this.pgPercentTotal;
          datosToModal.cantidadVG = cantidadVG;
          datosToModal.percentVG = this.vgPercentTotal;

          // Resultado title
          datosToModal.titlePage = this.getErrorTitleId("alqModalHeaderTitle");
          datosToModal.labelBases = this.getErrorTitleId("alqModalLabelBases");
          datosToModal.labelNicotina = this.getErrorTitleId("alqModalLabelNicotina");
          datosToModal.labelAromas = this.getErrorTitleId("alqModalLabelAromas");

          // Comprobamos o mostramos
          if ( Number(cantidadPG) <= 0 ) {
            this.errorToast(this.getErrorTitleId('alqCalculoErrorValidacionesControlPG'), 3000);
          }
          else if ( Number(cantidadVG) <= 0 ) {
            this.errorToast(this.getErrorTitleId('alqCalculoErrorValidacionesControlVG'), 3000);
          }
          else {
            this.openModal(datosToModal);
          }

        }
        else {
          errorTitle = this.getErrorTitleId('alqCalculoErrorValidacionControlAromas');
        }

      }
      else {
        errorTitle = this.getErrorTitleId('alqCalculoErrorAromasNoExiste');
      }

    }
    else {
      errorTitle = this.getErrorTitleId('alqCalculoErrorCantidaTotalNoExiste');      
    }

    // Si tenemos errores los mostramos
    if ( errorTitle != '' ) {
      this.errorToast(errorTitle, errorTime);
    }
    else {
      // Mostrar resultado
    }

  }

  /**
   * Open modal page
   */
  openModal(datos: any = {}){ 
    var modalPage = this.modalCtrl.create('AlquimiaModalPage', datos); 
    modalPage.present();
  }

  /**
  * Método de cálculo de regla de tres
  * 
  *   valor1 / valor3 = valor2 / valor4
  * 
  */
  calcularReglaTres(valor1, valor2, valor3, valor4, tipo = 'directa'){

  // this.showConsoleLog(typeof valor1);
  // this.showConsoleLog(typeof valor2);
  // this.showConsoleLog(typeof valor3);
  // this.showConsoleLog(typeof valor4);

  let resultado: number = 0;

  if ( tipo == 'directa' ) {
    // Caso 1 valor1 = X
    if ( typeof valor2 === 'number' && typeof valor3 === 'number' && typeof valor4 === 'number' ) {
      resultado = valor2 * valor3 / valor4;
      this.showConsoleLog('caso 1 = ' + resultado);
    }
    // Caso 2 valor2 = X
    else if ( typeof valor1 === 'number' && typeof valor3 === 'number' && typeof valor4 === 'number' ){
      resultado = valor1 * valor4 / valor3;
      this.showConsoleLog('caso 2 = ' + resultado);
    }
    // Caso 3 valor3 = X
    else if ( typeof valor1 === 'number' && typeof valor2 === 'number' && typeof valor4 === 'number' ){
      resultado = valor1 * valor4 / valor2;
      this.showConsoleLog('caso 3 = ' + resultado);
    }
    // Caso 4 valor4 = X
    else if ( typeof valor1 === 'number' && typeof valor2 === 'number' && typeof valor3 === 'number' ){
      resultado = valor2 * valor3 / valor1;
      this.showConsoleLog('caso 4 = ' + resultado);
    }
    else {
      resultado = parseFloat(valor1) * parseFloat(valor4) / parseFloat(valor2);
      this.showConsoleLog('caso 5 = ' + resultado);
    }
  }

  return resultado;
  }

  /**
  * Mostramos form add Aroma
  */
  // myValue:Boolean=false;
  // hideMe=false;
  showHiddenBottomAcciones(accion){
    this.showConsoleLog(this.alqBottomAcciones);
    if (accion == 1){
        this.alqBottomAcciones.nativeElement.style.display = 'block';
    }
    else {
        this.alqBottomAcciones.nativeElement.style.display = 'none';
    }
  }

  /**
   * On focus de un input
   */
  oldValor: any;
  onFocusValor(event){
    // this.showConsoleLog(event);
    this.oldValor = event.value;
    if ( event.type == "string" || event.type == "number" ) {
      event.value = "";
    }
    else {
      event.value = null;
    }
    // Ocultar bottom acciones
    this.showHiddenBottomAcciones(0);
  }

  /**
   * On focus de un input number
   */
  onBlurValor(event){
    // this.showConsoleLog(event);
    if ( event.value == null || event.value == '' || event.value == 0 ) {
      event.value = this.oldValor;
    }
    // Mostrar bottom acciones
    this.showHiddenBottomAcciones(1);
  }


  /**
   * 
   * Mostramos console log en función del entorno de trabajo
   * 
   * @param valor 
   */
  // Modo desarrollo o modo producción 0 = desarrollo 1 = producción 
  entornoTrabajo: string;
  showConsoleLog(valor){
    if ( this.entornoTrabajo == '0'){
      console.log(valor);
    }
  }
  
  /**
   * Buscar entorno de trabajo en localsotraje
   */
  getEntornoTrabajo(){
    this.entornoTrabajo = localStorage.getItem("entornoTrabajo");
    if ( this.entornoTrabajo != undefined && this.entornoTrabajo != null && this.entornoTrabajo == '1') {
      this.entornoTrabajo = '1';
    }
    else {
      this.entornoTrabajo = '0';
    }
  }

























  /**
   * CALCULAMOS RESULTADOS
   */
   lastCantidadTotal: number;
  calcularValores(event){

    // Variable para errores
    let errorTitle: string = '';
    let errorTime: any = 3000;
    let datosToModal: any = {};

    let pgValorCalculado: number = 0;
    let vgValorCalculado: number = 0;
    let valorVariable: number = 0;
    let cantidadLiquidoVariable: number = 0;

    // Si se ha introducido valor total
    if ( this.cantidadTotal != undefined && this.cantidadTotal != null && this.cantidadTotal != 0) {

      datosToModal.cantidadTotal = this.cantidadTotal;

      // Inicializamos resultadoAromas
      this.resultadoAromas = [ { nombre: '', cantidad: null, porcentaje: 0 } ];
      this.resultadoAromas.pop();

      let cantidadTotalSinAromas: number;
      cantidadTotalSinAromas = this.cantidadTotal;
      if ( this.aromas != undefined && this.aromas != null && this.aromas.length >= 1){

        // Calcular valores de aromas
        let valoresAromaThis: any;
        let nombrethis: string;
        let porcentajethis: number;
        let cantidadthis: number;
        this.aromas.forEach(element => {

          // Calculamos aroma
          nombrethis = element.nombreAroma;
          porcentajethis = element.cantidadAroma;
          // cálculo caso 3
          cantidadthis = this.calcularReglaTres(this.cantidadTotal, 100, 'x', element.cantidadAroma, 'directa');

          valoresAromaThis = { nombre: nombrethis, porcentaje: porcentajethis, cantidad: cantidadthis};
          this.resultadoAromas.push(valoresAromaThis);

          // Calculando total
          cantidadTotalSinAromas = cantidadTotalSinAromas - cantidadthis;
          this.showConsoleLog('cantidad total: ');
          this.showConsoleLog(cantidadTotalSinAromas);

          // Calculamos el pg - vg del aroma
          if ( element.cantidadPGBase != undefined && element.cantidadPGBase != null && element.cantidadPGBase <= 100 && element.cantidadPGBase >= 1 ) {

            valorVariable = this.calcularReglaTres(Number(cantidadthis), 100, 'x', Number(element.cantidadPGBase), 'directa');
            pgValorCalculado = Number(pgValorCalculado) + Number(valorVariable);
            // console.log('pgValor ' + pgValorCalculado);
            vgValorCalculado = Number(vgValorCalculado) + (Number(cantidadthis) - Number(valorVariable));
            // console.log('vgValor ' + vgValorCalculado);
            cantidadLiquidoVariable = Number(cantidadLiquidoVariable) + Number(valorVariable);

            // valorVariable = this.calcularReglaTres(Number(element.cantidadAroma), 'x', 100, Number(element.cantidadPGBase), 'directa');
            // pgValorCalculado = Number(pgValorCalculado) + Number(valorVariable);
            // vgValorCalculado = Number(vgValorCalculado) + (Number(element.cantidadAroma) - Number(valorVariable));
            // cantidadLiquidoVariable = Number(cantidadLiquidoVariable) + Number(cantidadthis);

            // this.showConsoleLog(element.nombreAroma);
            // this.showConsoleLog('valor variable');
            // this.showConsoleLog(valorVariable);
            // this.showConsoleLog('PG calculado');
            // this.showConsoleLog(pgValorCalculado);
            // this.showConsoleLog('VG calculado');
            // this.showConsoleLog(vgValorCalculado);
            // this.showConsoleLog('cantidad calculado');
            // this.showConsoleLog(cantidadLiquidoVariable);
          }

        });
        
        // Validación de control tras cálculo aromas
        if ( cantidadTotalSinAromas < this.cantidadTotal ) {

          // Resultado
          datosToModal.aromas = this.resultadoAromas;

          /**
           * CÄLCULOS PARA NICOTINA OPCIONAL
           */
          let resultadoCantidadNicotina: number;
          if (this.nicotinaToggle == true) {

            if ( this.cantidadNicotinaFinal != undefined && this.cantidadNicotinaFinal != null && this.cantidadNicotinaFinal != 0 ) {

              if ( this.cantidadNicotinaBase != undefined && this.cantidadNicotinaBase != null && this.cantidadNicotinaBase != 0 ) {

                resultadoCantidadNicotina = this.cantidadNicotinaFinal * this.cantidadTotal / this.cantidadNicotinaBase;
                // console.log(resultadoCantidadNicotina);
                resultadoCantidadNicotina = Math.round(resultadoCantidadNicotina * 100) / 100;
                // console.log(resultadoCantidadNicotina);
                this.showConsoleLog('Cantidad nicotina ml');
                this.showConsoleLog(resultadoCantidadNicotina);

                cantidadTotalSinAromas = cantidadTotalSinAromas - resultadoCantidadNicotina;
                cantidadTotalSinAromas = Math.round(cantidadTotalSinAromas * 100) / 100;
                this.showConsoleLog('Cantidad total resto');
                this.showConsoleLog(cantidadTotalSinAromas);
                
                // Resultado
                datosToModal.resultadoCantidadNicotina = resultadoCantidadNicotina;
                datosToModal.nicotinaBase = this.cantidadNicotinaBase;
                datosToModal.nicotinaMezcla = this.cantidadNicotinaFinal;

                // Calculamos el pg - vg del aroma
                if ( this.cantidadNicotinaPGBase != undefined && this.cantidadNicotinaPGBase != null && this.cantidadNicotinaPGBase <= 100 && this.cantidadNicotinaPGBase >= 1 ) {
                  valorVariable = this.calcularReglaTres(Number(resultadoCantidadNicotina), 100, 'x', Number(this.cantidadNicotinaPGBase), 'directa');
                  pgValorCalculado = Number(pgValorCalculado) + Number(valorVariable);
                  vgValorCalculado = Number(vgValorCalculado) + (Number(resultadoCantidadNicotina) - Number(valorVariable));
                  cantidadLiquidoVariable = Number(cantidadLiquidoVariable) + Number(resultadoCantidadNicotina);

                  // valorVariable = this.calcularReglaTres(Number(resultadoCantidadNicotina), 'x', 100, Number(this.cantidadNicotinaPGBase), 'directa');
                  // pgValorCalculado = Number(pgValorCalculado) + Number(valorVariable);
                  // vgValorCalculado = Number(vgValorCalculado) + (Number(resultadoCantidadNicotina) - Number(valorVariable));
                  // cantidadLiquidoVariable = Number(cantidadLiquidoVariable) + Number(resultadoCantidadNicotina);
                }
                
              }
              else {
                // ERROR cantidad nicotina Base no introducida
              }

            }
            else {
              // ERROR cantidad nicotina no introducida
            }

          }

          // CALCULO FINAL
          // let cantidadTotalParaCalcular: number;
          // console.log(pgValorCalculado);
          pgValorCalculado = Math.round(pgValorCalculado * 100) / 100;
          // console.log(vgValorCalculado);
          vgValorCalculado = Math.round(vgValorCalculado * 100) / 100;
          cantidadLiquidoVariable = Math.round(cantidadLiquidoVariable * 100) / 100;

          this.showConsoleLog('PG calculado');
          this.showConsoleLog(pgValorCalculado);
          this.showConsoleLog('VG calculado');
          this.showConsoleLog(vgValorCalculado);
          this.showConsoleLog('cantidad calculado');
          this.showConsoleLog(cantidadLiquidoVariable);

          let pgTotal: number = this.calcularReglaTres(Number(this.cantidadTotal),'x', 100, Number(this.pgPercentTotal), 'directa');
          let vgTotal: number = this.calcularReglaTres(Number(this.cantidadTotal),'x', 100, Number(this.vgPercentTotal), 'directa');
          let pgResto: number = pgTotal - pgValorCalculado;
          let vgResto: number = vgTotal - vgValorCalculado;

          let cantidadPG: number = pgResto;

          let cantidadVG: number = vgResto;

          // Resultado
          datosToModal.cantidadPG = cantidadPG;
          datosToModal.percentPG = this.pgPercentTotal;
          datosToModal.cantidadVG = cantidadVG;
          datosToModal.percentVG = this.vgPercentTotal;

          // Resultado title
          datosToModal.titlePage = this.getErrorTitleId("alqModalHeaderTitle");
          datosToModal.labelBases = this.getErrorTitleId("alqModalLabelBases");
          datosToModal.labelNicotina = this.getErrorTitleId("alqModalLabelNicotina");
          datosToModal.labelAromas = this.getErrorTitleId("alqModalLabelAromas");

          // Comprobamos o mostramos
          if ( Number(cantidadPG) <= 0 ) {
            this.errorToast(this.getErrorTitleId('alqCalculoErrorValidacionesControlPG'), 3000);
          }
          else if ( Number(cantidadVG) <= 0 ) {
            this.errorToast(this.getErrorTitleId('alqCalculoErrorValidacionesControlVG'), 3000);
          }
          else {
            this.openModal(datosToModal);
          }

        }
        else {
          errorTitle = this.getErrorTitleId('alqCalculoErrorValidacionControlAromas');
        }

      }
      else {
        errorTitle = this.getErrorTitleId('alqCalculoErrorAromasNoExiste');
      }

    }
    else {
      errorTitle = this.getErrorTitleId('alqCalculoErrorCantidaTotalNoExiste');      
    }

    // Si tenemos errores los mostramos
    if ( errorTitle != '' ) {
      this.errorToast(errorTitle, errorTime);
    }
    else {
      // Mostrar resultado
    }

  }


















}