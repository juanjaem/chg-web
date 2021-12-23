import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { DatosPluviometricosTrExt } from '../precipitaciones.component';
import * as lodash from 'lodash';
import { FormControl, FormGroup } from '@angular/forms';
import { pairwise, Subscription } from 'rxjs';
import { PROVINCIAS_LISTA } from './../../../../nucleo/constantes/provincias';

const PROVINCIAS_SELECIONADAS_ESTADO = 'fil-prec-tr_prov-sel-est_v1';
const PROVINCIAS_SELECIONADAS = 'fil-prec-tr_prov-sel_v1';
const FAVORITOS_SELECCIONADOS_ESTADO = 'fil-prec-tr_favo-sel-est_v1';
const FAVORITOS_SELECCIONADOS = 'fil-prec-tr_favo-sel-_v1';

export interface FiltrosPreciptacionesTr {
  busquedaFavorito: string;
  provinciasEstado: boolean;
  provincias: string[];
  favoritosEstado: boolean;
  favoritos: string[];
}

@Component({
  selector: 'app-precipitaciones-filtros',
  templateUrl: './precipitaciones-filtros.component.html',
  styleUrls: ['./precipitaciones-filtros.component.scss']
})
export class PrecipitacionesFiltrosComponent implements AfterViewInit, OnDestroy {
  @Output() datosFiltrados = new EventEmitter<DatosPluviometricosTrExt[]>();

  _datosOriginales: DatosPluviometricosTrExt[] = [];
  @Input() set datosOriginales(datos: DatosPluviometricosTrExt[]) {
    if (datos.length > 0) {
      this._datosOriginales = datos;
      this.favoritosOpciones = lodash.clone(datos);
      this.filtrosForm.setValue({ ...this.obtenerFiltros(), busquedaFavorito: '' });
      this.filtrosForm.setValue({ ...this.obtenerFiltros(), busquedaFavorito: '' }); // Necesario esta 2ª asignación para que pase el pairWise()
    }
  }

  @Input() set favorito(favorito: string) {
    const idx = this.filtrosForm.controls['favoritos'].value.findIndex((prov: string) => prov === favorito);
    if (idx >= 0 && this.filtrosForm.controls['favoritosEstado'].value) {
      // Quitar favorito (solo cuando esté marcado el check de favoritos)
      this.filtrosForm.controls['favoritos'].setValue(this.filtrosForm.controls['favoritos'].value.filter((prov: string) => prov !== favorito));
    } else {
      // Añadir favorito
      this.filtrosForm.controls['favoritos'].setValue([...this.filtrosForm.controls['favoritos'].value, favorito]);
    }
    this.filtrosForm.controls['favoritosEstado'].setValue(true);
  }

  provinciasLista = PROVINCIAS_LISTA;
  busquedaFavorito: string = '';
  favoritosOpciones: DatosPluviometricosTrExt[] = [];

  filtrosForm = new FormGroup({
    busquedaFavorito: new FormControl(''),
    favoritos: new FormControl([]),
    favoritosEstado: new FormControl(false),
    provincias: new FormControl([]),
    provinciasEstado: new FormControl(false)
  });

  filtrosFormSubs: Subscription | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    this.filtrosFormSubs = this.filtrosForm.valueChanges.pipe(pairwise()).subscribe((filtros: FiltrosPreciptacionesTr[]) => {
      if (filtros[0].busquedaFavorito !== filtros[1].busquedaFavorito) {
        // Ha cambiado el valor de la busqueda de favoritos. Filtrar el combo
        this.filtrarComboFavoritos(filtros[1].busquedaFavorito);
      } else {
        // Han cambiado algún filtro. Filtrar.
        this.aplicarFiltros(filtros[1]);
      }
    });
  }

  ngOnDestroy(): void {
    this.filtrosFormSubs?.unsubscribe();
  }

  aplicarFiltros(filtros: FiltrosPreciptacionesTr): void {
    let datosFiltrados: DatosPluviometricosTrExt[] = lodash.cloneDeep(this._datosOriginales);
    this.almacenarFiltros(filtros);

    // FILTRO DE PROVINCIA
    if (filtros.provinciasEstado) {
      if (filtros.provincias.length > 0) {
        datosFiltrados = datosFiltrados.filter((datoPluv) => filtros.provincias.findIndex((codigo) => datoPluv.provincia.codigo === codigo) >= 0);
      }
    }

    // APLICAR FAVORITOS SELECCIONADOS
    if (filtros.favoritosEstado) {
      if (filtros.favoritos.length > 0) {
        datosFiltrados.map((dato) => {
          if (filtros.favoritos.findIndex((nombreFavorito) => nombreFavorito === dato.pluviometro.nombre) !== -1) {
            dato.favorito = true;
          }
          return dato;
        });
      }
    }

    this.datosFiltrados.emit(datosFiltrados);
  }

  almacenarFiltros(filtros: FiltrosPreciptacionesTr): void {
    localStorage.setItem(PROVINCIAS_SELECIONADAS_ESTADO, JSON.stringify(filtros.provinciasEstado || false));
    localStorage.setItem(PROVINCIAS_SELECIONADAS, JSON.stringify(filtros.provincias || []));
    localStorage.setItem(FAVORITOS_SELECCIONADOS_ESTADO, JSON.stringify(filtros.favoritosEstado || false));
    localStorage.setItem(FAVORITOS_SELECCIONADOS, JSON.stringify(filtros.favoritos || []));
  }

  obtenerFiltros(): FiltrosPreciptacionesTr {
    return {
      provinciasEstado: JSON.parse(localStorage.getItem(PROVINCIAS_SELECIONADAS_ESTADO) || 'false'),
      provincias: JSON.parse(localStorage.getItem(PROVINCIAS_SELECIONADAS) || '[]'),
      favoritosEstado: JSON.parse(localStorage.getItem(FAVORITOS_SELECCIONADOS_ESTADO) || 'false'),
      favoritos: JSON.parse(localStorage.getItem(FAVORITOS_SELECCIONADOS) || '[]')
    } as FiltrosPreciptacionesTr;
  }

  filtrarComboFavoritos(busqueda: string) {
    this.favoritosOpciones = lodash.clone(this._datosOriginales);

    if (busqueda && typeof busqueda === 'string') {
      this.favoritosOpciones = this._datosOriginales.filter((opcion) => {
        return opcion.pluviometro.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1;
      });
    }
  }
}
