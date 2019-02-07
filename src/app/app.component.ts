import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';
import { TranslateService } from '@ngx-translate/core';
// header color
import { HeaderColor } from '@ionic-native/header-color';

// import { HomePage } from '../pages/home/home';
import { AlquimiaPage } from '../pages/alquimia/alquimia';
import { ResistenciasPage } from '../pages/resistencias/resistencias';
import { LoginPage } from '../pages/login/login';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { AboutPage } from '../pages/about/about';
// import { Header } from 'ionic-angular/navigation/nav-interfaces';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  
  // Página de inicio
  rootPage:any = AlquimiaPage;
  // Arrays de páginas habilitadas
  pages: Array<{title: string , component: any}>;
  // Cambio de theme NO FUNCIONA
  selectedTheme: String;
  // Idioma seleccionado y guardado en localstorage
  idiomaSelected: string;
  
  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private translateService: TranslateService,
    public alertCtrl: AlertController,
    private headerColor: HeaderColor
    // ,private settings: ConfiguracionPage
  ) {

    this.selectedTheme = 'ionic.theme.default';
    
    /**
    * Inicializamos el menu
    */
    this.pages = [
      // { title: 'menuListHome', component: HomePage },
      { title: 'menuListAlquimia', component: AlquimiaPage },
      { title: 'menuListResistencias', component: ResistenciasPage },
      { title: 'menuListLogin', component: LoginPage },
      { title: 'menuListConfiguracion', component: ConfiguracionPage },
      { title: 'menuListAbout', component: AboutPage }
    ];
    
    /**
    * Inicializamos la aplicación
    * Si le pasamos 1 se inicia en modo producción
    * Si le pasamos 0 se inicia en modo desarrollo
    */
    this.initialize(1);
    
  }
  
  initialize(mode){

    if ( mode == 1 ) {
      // Inicializamos en modo de producción
      this.enableProdMode();
    }
    else {
      this.entornoTrabajo = '0';
    }
    
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      // this.splashScreen.hide();

      // entorno de trabajo
      this.getEntornoTrabajo();
      
      //Language
      // ByDefault
      this.translateService.setDefaultLang('es');
      // Localstorage
      this.idiomaSelected = localStorage.getItem('idioma');

      if ( this.idiomaSelected != undefined && this.idiomaSelected != null && this.idiomaSelected != ''){
        this.translateService.use(this.idiomaSelected);
      }
      else {
        this.translateService.use('es');
      }

      // Header color
      // this.headerColor.tint('#1ABC9C');
      this.headerColor.tint('#1A8BBC');
      
      // Acciones de SplashCreen
      setTimeout(() => {
        this.splashScreen.hide();
        timer(this.timeInicio).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
      }, this.timeInicio);
      
    });
    
  }
  
  openPageForeach(page) {
    
    let setPage: object;
    
    this.pages.forEach(function (valor) {
      
      if (valor.title != undefined && valor.title != null && valor.title != '' && page != undefined && page != null && page != ''
      && valor.title == page) {
        
        // console.log(valor.title);
        // console.log(valor.component);
        // this.showConsoleLog(valor.title);
        // this.showConsoleLog(valor.component);
        setPage = valor.component;
        
      }
      
    });
    
    if (setPage != null) {
      this.nav.setRoot( setPage );
    }
    
  }

  /**
   * 
   * Mostramos console log en función del entorno de trabajo
   * 
   * @param valor 
   */
  // showConsoleLog(valor){
  //   if ( this.entornoTrabajo == '0'){
  //     console.log(valor);
  //   }
  // }
  
  /**
   * Buscar entorno de trabajo en localsotraje
   */
  // Modo desarrollo o modo producción 0 = desarrollo 1 = producción 
  entornoTrabajo: string = "0";
  timeInicio: number;
  // Inicio
  showSplash = false; // <-- show animation
  getEntornoTrabajo(){
    if ( this.entornoTrabajo != undefined && this.entornoTrabajo != null && this.entornoTrabajo == '1') {
      this.entornoTrabajo = '1';
      this.timeInicio = 2000;
    }
    else {
      this.entornoTrabajo = '0';
      this.timeInicio = 1;
    }
    localStorage.setItem("entornoTrabajo", this.entornoTrabajo);
  }

  enableProdMode() {
    this.entornoTrabajo = '1';
  }

} // Fin Clase

