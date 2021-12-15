import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmacionPersonalizadaComponent } from './confirmacion-personalizada.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BtnJuntaEstandarModule } from '../../../../compartido/btn-junta-estandar/btn-junta-estandar.module';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [ConfirmacionPersonalizadaComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, BtnJuntaEstandarModule, FontAwesomeModule]
})
export class ConfirmacionPersonalizadaModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTimes);
  }
}
