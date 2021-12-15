import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosActualesRoutingModule } from './datos-actuales-routing.module';
import { DatosActualesComponent } from './datos-actuales.component';
import { PrecipitacionesComponent } from './precipitaciones/precipitaciones.component';

@NgModule({
  declarations: [DatosActualesComponent, PrecipitacionesComponent],
  imports: [CommonModule, DatosActualesRoutingModule]
})
export class DatosActualesModule {}
