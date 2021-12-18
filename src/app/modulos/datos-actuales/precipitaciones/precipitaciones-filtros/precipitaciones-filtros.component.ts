import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TRPrecipitacion } from '../precipitaciones.component';

@Component({
  selector: 'app-precipitaciones-filtros',
  templateUrl: './precipitaciones-filtros.component.html',
  styleUrls: ['./precipitaciones-filtros.component.scss']
})
export class PrecipitacionesFiltrosComponent {
  @Input() datosOriginales: TRPrecipitacion[] = [];
  @Output() datosFiltrados = new EventEmitter<TRPrecipitacion[]>();

  estadoFiltroProvincia: boolean = true;
  codigoProvSelec: string[] = [];

  provinciasLista: { codigo: string; valor: string }[] = [
    { codigo: '(AB)', valor: 'Albacete' },
    { codigo: '(CR)', valor: 'CiudadReal' },
    { codigo: '(CO)', valor: 'Cordoba' },
    { codigo: '(GR)', valor: 'Granada' },
    { codigo: '(HU)', valor: 'Huelva' },
    { codigo: '(JA)', valor: 'Jaén' },
    { codigo: '(SE)', valor: 'Sevilla' }
  ];

  constructor() {}

  activarDesactivarFiltroProvincia () {
    if (this.estadoFiltroProvincia) {
      this.filtrarProvincia(this.codigoProvSelec);
    } else {
      this.filtrarProvincia([]);
    }
  }

  filtrarProvincia(codigoProvSelec: string[]) {
    let datosFiltradosAux: TRPrecipitacion[] = [];

    if (codigoProvSelec.length === 0) {
      datosFiltradosAux = this.datosOriginales;
    } else {
      this.codigoProvSelec = codigoProvSelec;
      datosFiltradosAux = this.datosOriginales.filter((pluviometro) => {
        if (codigoProvSelec.findIndex((codigo) => pluviometro.nombrePunto.includes(codigo)) >= 0) {
          return true;
        } else {
          return false;
        }
      });
    }

    this.datosFiltrados.emit(datosFiltradosAux);
  }
}
