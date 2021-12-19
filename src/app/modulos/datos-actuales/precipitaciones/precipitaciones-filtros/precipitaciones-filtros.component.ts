import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatosPluviometricosTrExt } from '../precipitaciones.component';

@Component({
  selector: 'app-precipitaciones-filtros',
  templateUrl: './precipitaciones-filtros.component.html',
  styleUrls: ['./precipitaciones-filtros.component.scss']
})
export class PrecipitacionesFiltrosComponent {
  @Input() datosOriginales: DatosPluviometricosTrExt[] = [];
  @Output() datosFiltrados = new EventEmitter<DatosPluviometricosTrExt[]>();

  provinciasSeleccionadasEstado: boolean = false;
  provinciasSeleccionadas: string[] = [];

  provinciasLista: { codigo: string; valor: string }[] = [
    { codigo: 'AB', valor: 'Albacete' },
    { codigo: 'AL', valor: 'Almería' },
    { codigo: 'BA', valor: 'Badajoz' },
    { codigo: 'CE', valor: 'Ceuta' },
    { codigo: 'CR', valor: 'Ciudad Real' },
    { codigo: 'CO', valor: 'Córdoba' },
    { codigo: 'GR', valor: 'Granada' },
    { codigo: 'HU', valor: 'Huelva' },
    { codigo: 'JA', valor: 'Jaén' },
    { codigo: 'ME', valor: 'Melilla' },
    { codigo: 'SE', valor: 'Sevilla' }
  ];

  constructor() {}

  filtrar() {
    let datosFiltrados: DatosPluviometricosTrExt[] = [...this.datosOriginales];

    // FILTRO DE PROVINCIA
    if (this.provinciasSeleccionadasEstado) {
      if (this.provinciasSeleccionadas.length > 0) {
        datosFiltrados = this.datosOriginales.filter(
          (datoPluv) => this.provinciasSeleccionadas.findIndex((codigo) => datoPluv.provincia.codigo === codigo) >= 0
        );
      }
    }

    this.datosFiltrados.emit(datosFiltrados);
  }
}
