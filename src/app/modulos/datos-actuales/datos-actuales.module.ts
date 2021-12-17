import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosActualesRoutingModule } from './datos-actuales-routing.module';
import { DatosActualesComponent } from './datos-actuales.component';
import { PrecipitacionesComponent } from './precipitaciones/precipitaciones.component';
import { PrecipitacionesModule } from './precipitaciones/precipitaciones.module';

@NgModule({
  declarations: [DatosActualesComponent, PrecipitacionesComponent],
  imports: [CommonModule, DatosActualesRoutingModule, PrecipitacionesModule]
})
export class DatosActualesModule {}
