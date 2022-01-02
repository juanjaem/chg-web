import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosActualesRoutingModule } from './datos-actuales-routing.module';
import { DatosActualesComponent } from './datos-actuales.component';
import { PrecipitacionesComponent } from './precipitaciones/precipitaciones.component';
import { PrecipitacionesModule } from './precipitaciones/precipitaciones.module';
import { MapaPluviometricoModule } from './mapa-pluviometrico/mapa-pluviometrico.module';

@NgModule({
  declarations: [DatosActualesComponent, PrecipitacionesComponent],
  imports: [CommonModule, DatosActualesRoutingModule, PrecipitacionesModule, MapaPluviometricoModule]
})
export class DatosActualesModule {}
