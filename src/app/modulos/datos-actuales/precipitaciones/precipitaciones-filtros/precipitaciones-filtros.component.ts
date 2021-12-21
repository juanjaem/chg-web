import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatosPluviometricosTrExt } from '../precipitaciones.component';
import * as lodash from 'lodash';

const PROVINCIAS_SELECIONADAS_ESTADO = 'fil-prec-tr_prov-sel-est_v1';
const PROVINCIAS_SELECIONADAS = 'fil-prec-tr_prov-sel_v1';
const FAVORITOS_SELECCIONADOS_ESTADO = 'fil-prec-tr_favo-sel-est_v1';
const FAVORITOS_SELECCIONADOS = 'fil-prec-tr_favo-sel-_v1';

export interface FiltrosPreciptacionesTr {
  provinciasSeleccionadasEstado: boolean;
  provinciasSeleccionadas: string[];
  favoritosSeleccionadosEstado: boolean;
  favoritosSeleccionados: string[];
}

@Component({
  selector: 'app-precipitaciones-filtros',
  templateUrl: './precipitaciones-filtros.component.html',
  styleUrls: ['./precipitaciones-filtros.component.scss']
})
export class PrecipitacionesFiltrosComponent {
  @Output() datosFiltrados = new EventEmitter<DatosPluviometricosTrExt[]>();

  _datosOriginales: DatosPluviometricosTrExt[] = [];
  @Input() set datosOriginales(datos: DatosPluviometricosTrExt[]) {
    this._datosOriginales = datos;
    // console.log('ENTRA');
    if (datos.length > 0) {
      this.filtros = this.obtenerFiltros();
      this.aplicarFiltros();
    }
  }

  @Input() set favorito(favorito: string) {
    const idx = this.filtros.favoritosSeleccionados.findIndex((prov) => prov === favorito);
    console.log(idx);
    if (idx >= 0) {
      this.filtros.favoritosSeleccionados = this.filtros.favoritosSeleccionados.filter((prov) => prov !== favorito);
    } else {
      this.filtros.favoritosSeleccionados.push(favorito);
      this.filtros.favoritosSeleccionados = this.filtros.favoritosSeleccionados;
    }
    this.aplicarFiltros();
  }

  filtros: FiltrosPreciptacionesTr = {
    provinciasSeleccionadasEstado: false,
    provinciasSeleccionadas: [],
    favoritosSeleccionadosEstado: false,
    favoritosSeleccionados: []
  };

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

  aplicarFiltros(): void {
    let datosFiltrados: DatosPluviometricosTrExt[] = lodash.cloneDeep(this._datosOriginales);
    this.almacenarFiltros(this.filtros);

    // FILTRO DE PROVINCIA
    if (this.filtros.provinciasSeleccionadasEstado) {
      if (this.filtros.provinciasSeleccionadas.length > 0) {
        datosFiltrados = datosFiltrados.filter(
          (datoPluv) => this.filtros.provinciasSeleccionadas.findIndex((codigo) => datoPluv.provincia.codigo === codigo) >= 0
        );
      }
    }

    // APLICAR FAVORITOS SELECCIONADOS
    if (this.filtros.favoritosSeleccionadosEstado) {
      if (this.filtros.favoritosSeleccionados.length > 0) {
        datosFiltrados.map((dato) => {
          if (this.filtros.favoritosSeleccionados.findIndex((nombreFavorito) => nombreFavorito === dato.pluviometro.nombre) !== -1) {
            dato.favorito = true;
          }
          return dato;
        });
      }
    }

    this.datosFiltrados.emit(datosFiltrados);
  }

  almacenarFiltros(filtros: FiltrosPreciptacionesTr): void {
    localStorage.setItem(PROVINCIAS_SELECIONADAS_ESTADO, JSON.stringify(filtros.provinciasSeleccionadasEstado));
    localStorage.setItem(PROVINCIAS_SELECIONADAS, JSON.stringify(filtros.provinciasSeleccionadas));
    localStorage.setItem(FAVORITOS_SELECCIONADOS_ESTADO, JSON.stringify(filtros.favoritosSeleccionadosEstado));
    localStorage.setItem(FAVORITOS_SELECCIONADOS, JSON.stringify(filtros.favoritosSeleccionados));
  }

  obtenerFiltros(): FiltrosPreciptacionesTr {
    return {
      provinciasSeleccionadasEstado: JSON.parse(localStorage.getItem(PROVINCIAS_SELECIONADAS_ESTADO) || 'false'),
      provinciasSeleccionadas: JSON.parse(localStorage.getItem(PROVINCIAS_SELECIONADAS) || '[]'),
      favoritosSeleccionadosEstado: JSON.parse(localStorage.getItem(FAVORITOS_SELECCIONADOS_ESTADO) || 'false'),
      favoritosSeleccionados: JSON.parse(localStorage.getItem(FAVORITOS_SELECCIONADOS) || '[]')
    } as FiltrosPreciptacionesTr;
  }
}
