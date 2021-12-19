import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatosPluviometricosTrExt } from '../precipitaciones.component';
import * as lodash from 'lodash';

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
  favoritosSeleccionadosEstado: boolean = false;
  favoritosSeleccionados: string[] = [];

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

  aplicarOpciones() {
    let datosFiltrados: DatosPluviometricosTrExt[] = lodash.cloneDeep(this.datosOriginales);

    // FILTRO DE PROVINCIA
    if (this.provinciasSeleccionadasEstado) {
      if (this.provinciasSeleccionadas.length > 0) {
        datosFiltrados = datosFiltrados.filter((datoPluv) => this.provinciasSeleccionadas.findIndex((codigo) => datoPluv.provincia.codigo === codigo) >= 0);
      }
    }

    // APLICAR FAVORITOS SELECCIONADOS
    if (this.favoritosSeleccionadosEstado) {
      if (this.favoritosSeleccionados.length > 0) {
        datosFiltrados.map((dato) => {
          if (this.favoritosSeleccionados.findIndex((nombreFavorito) => nombreFavorito === dato.pluviometro.nombre) !== -1) {
            dato.favorito = true;
          }
          return dato;
        });
      }
    }

    this.datosFiltrados.emit(datosFiltrados);
  }
}
