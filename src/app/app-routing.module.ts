import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaAccesoComponent } from './paginas/pagina-acceso/pagina-acceso.component';
import { PaginaRutaNoEncontradaComponent } from './paginas/pagina-ruta-no-encontrada/pagina-ruta-no-encontrada.component';

const routes: Routes = [
  { path: '', redirectTo: '/acceso', pathMatch: 'full' },
  {
    path: 'acceso',
    component: PaginaAccesoComponent
  },
  {
    path: 'datos-actuales',
    canActivate: [],
    loadChildren: () => import('./modulos/datos-actuales/datos-actuales.module').then((mod) => mod.DatosActualesModule)
  },
  { path: '**', component: PaginaRutaNoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
