import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResistenciasPage } from './resistencias';

@NgModule({
  declarations: [
    ResistenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(ResistenciasPage),
  ],
})
export class ResistenciasPageModule {}
