import { Component } from '@angular/core';

@Component({
  selector: 'app-precipitaciones-filtros',
  templateUrl: './precipitaciones-filtros.component.html',
  styleUrls: ['./precipitaciones-filtros.component.scss']
})
export class PrecipitacionesFiltrosComponent  {
  provinciasLista: string[] = ['Jaén', 'Cordoba', 'Granada'];

  constructor() { }

  filtrarProvincia(e: string[]) {
    console.log('filtrar provincia');
    console.log(e);
  }
}
