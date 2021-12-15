import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  constructor(private httpClient: HttpClient) {}

  peticion<T>(peticionOpciones: PeticionOpciones): Observable<HttpResponse<T>> {
    const httpRequest: HttpRequest<T> = this.generarObjetoHttpRequest(peticionOpciones);

    return this.httpClient.request<T>(httpRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        // Manejar error globalmente:
        throw err;
      }),
      filter<any>((event) => event instanceof HttpResponse), // Corta el flujo de datos con eventos no deseados, como el {type: 0}
      tap((res: HttpResponse<any>) => {
        // Hacer algo si procede
      })
    );
  }

  // Genera un objeto HttpRequest con los datos pasados por parámetro.
  private generarObjetoHttpRequest(peticionesOpciones: PeticionOpciones): HttpRequest<any> {
    const init: {
      headers?: HttpHeaders | undefined;
      context?: HttpContext | undefined;
      reportProgress?: boolean | undefined;
      params?: HttpParams | undefined;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean | undefined;
    } = {};

    // Adjuntar headers
    init.headers = new HttpHeaders();
    if (peticionesOpciones.datosPeticion?.headers) {
      peticionesOpciones.datosPeticion.headers.forEach((header) => {
        init.headers = init.headers?.append(header.nombre, header.valor);
      });
    }
    // Si no se han adjuntado el header "Content-Type", lo adjuntamos automáticamente
    if (!init.headers.has('Content-Type')) {
      init.headers = init.headers.append('Content-Type', 'application/json');
    }
    // Si no se han adjuntado el header "Accept" lo adjuntamos automáticamente
    if (!init.headers.has('Accept')) {
      init.headers = init.headers.append('Accept', 'application/json');
    }
    if (peticionesOpciones.adjuntarToken) {
      init.headers = init.headers.append('adjuntarToken', 'S');
    }
    if (peticionesOpciones.mostrarAlertaError) {
      init.headers = init.headers.append('mostrarAlertaError', 'S');
    }

    // Adjuntar parametros
    if (peticionesOpciones.datosPeticion?.params) {
      init.params = new HttpParams();
      peticionesOpciones.datosPeticion.params.forEach((param) => {
        init.params = init.params?.append(param.nombre, param.valor);
      });
    }

    if (peticionesOpciones.reportProgress) {
      init.reportProgress = peticionesOpciones.reportProgress;
    }

    if (peticionesOpciones.responseType) {
      init.responseType = peticionesOpciones.responseType;
    }
    if (peticionesOpciones.withCredentials) {
      init.withCredentials = peticionesOpciones.withCredentials;
    }

    return new HttpRequest(peticionesOpciones.method, peticionesOpciones.url, peticionesOpciones.datosPeticion?.body || {}, init);
  }
}

export interface PeticionOpciones {
  url: string;
  method: string;
  adjuntarToken: boolean;
  datosPeticion?: DatosPeticion;
  mostrarAlertaError: boolean;
  reportProgress?: boolean;
  withCredentials?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
}

export interface DatosPeticion {
  body?: {};
  headers?: { nombre: string; valor: string }[];
  params?: { nombre: string; valor: string }[];
}
