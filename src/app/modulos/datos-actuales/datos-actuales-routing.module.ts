import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosActualesComponent } from './datos-actuales.component';
import { PrecipitacionesComponent } from './precipitaciones/precipitaciones.component';

const routes: Routes = [
  {
    path: '',
    component: DatosActualesComponent,
    children: [
      {
        path: 'precipitaciones',
        component: PrecipitacionesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosActualesRoutingModule {}
