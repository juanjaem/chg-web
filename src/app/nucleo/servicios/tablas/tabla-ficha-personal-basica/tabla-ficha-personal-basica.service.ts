import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { map, Observable, catchError, of } from 'rxjs';
import { PeticionesService } from './../../peticiones/peticiones.service';
import { PeticionOpciones } from '../../peticiones/peticiones.service';
import { GET_GRADOS_DEPENDENCIA, GET_TIPOS_DOMICILIO } from 'src/app/nucleo/constantes/llamadas';
import * as lodash from 'lodash';

// A BORRAR!!!!!
const MOCK_RESP = [
  { codigo: '1', nombre: 'uno' },
  { codigo: '2', nombre: 'dos' },
  { codigo: '3', nombre: 'tres' },
  { codigo: '4', nombre: 'cuatro' }
];
// =============

/**
 * Servicio para la obtención de tablas del "Repositorio ProgreSSa Troncal de Fichas Personales Básicas"
 */
@Injectable({
  providedIn: 'root'
})
export class TablaFichaPersonalBasicaService {
  private tabla: TablaFichaPersonalBasica = {};

  constructor(private peticionesService: PeticionesService) {}

  /**
   * Obtiene los grados de dependencia.
   */
  public gradosDependencia(): Observable<TablaCodigoNombre[]> {
    if (!this.tabla?.gradosDependencia) {
      let peticionesOpciones: PeticionOpciones = {
        url: GET_GRADOS_DEPENDENCIA,
        method: 'get',
        adjuntarToken: true,
        mostrarAlertaError: true
      };

      return this.peticionesService.peticion<TablaCodigoNombre[]>(peticionesOpciones).pipe(
        catchError((e) => of(new HttpResponse({ body: MOCK_RESP }))), // <-- ¡¡BORRAR ESTE MOKEO!!
        map((res) => {
          this.tabla.gradosDependencia = res.body || [];
          return res.body || [];
        })
      );
    } else {
      return of(this.tabla.gradosDependencia);
    }
  }

  /**
   * Obtiene los tipos de domicilio que pertenece a un tipo domicilio principal.
   * @param tipoDomicilioPrincipal el campo "código" de uno de los resultados de la "consulta de los tipos de domicilio"
   */
  public tiposDomicilio(tipoDomicilioPrincipal: string): Observable<TablaCodigoNombre[]> {
    if (!this.tabla?.tiposDomicilio || !this.tabla.tiposDomicilio[tipoDomicilioPrincipal]) {
      const urlTemplate = lodash.template(GET_TIPOS_DOMICILIO);
      let peticionesOpciones: PeticionOpciones = {
        url: urlTemplate({ tipoDomicilioPrincipal }),
        method: 'get',
        adjuntarToken: true,
        mostrarAlertaError: true
      };

      return this.peticionesService.peticion<TablaCodigoNombre[]>(peticionesOpciones).pipe(
        catchError((e) => of(new HttpResponse({ body: MOCK_RESP }))), // <-- ¡¡BORRAR ESTE MOKEO!!
        map((res) => {
          if (this.tabla?.tiposDomicilio) {
            this.tabla.tiposDomicilio[tipoDomicilioPrincipal] = res.body || [];
          } else {
            this.tabla.tiposDomicilio = {};
            this.tabla.tiposDomicilio[tipoDomicilioPrincipal] = res.body || [];
          }
          return res.body || [];
        })
      );
    } else {
      return of(this.tabla.tiposDomicilio[tipoDomicilioPrincipal]);
    }
  }
}

export interface TablaFichaPersonalBasica {
  gradosDependencia?: TablaCodigoNombre[];
  gradosDiscapacidad?: TablaCodigoNombre[];
  motivosAcceso?: TablaCodigoNombre[];
  nivelesEstudio?: TablaCodigoNombre[];
  sexos?: TablaCodigoNombre[];
  tiposDiscapacidad?: TablaCodigoNombre[];
  tiposDomiciliosPrincipales?: TablaCodigoNombre[];
  tiposDomicilio?: { [index: string]: TablaCodigoNombre[] };
  tiposEstadoCivil?: TablaCodigoNombre[];
  tiposIdentificacion?: TablaCodigoNombre[];
  tiposOcupacion?: TablaCodigoNombre[];
  tiposSituacionLaboral?: TablaCodigoNombre[];
}

interface TablaCodigoNombre {
  codigo: string;
  nombre: string;
}
