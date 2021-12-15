import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CodigoError400 } from '../../constantes/codigos-error-400';
import { Error400Res } from '../../interfaces/respuesta.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private matSnackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.get('mostrarAlertaError')) {
      // Mostrar error
      return next.handle(request).pipe(
        catchError((e) => {
          if (e instanceof HttpErrorResponse) {
            // Error de backend
            this.mostrarMensajeError(e);
          }
          return throwError(() => e);
        })
      );
    } else {
      // NO mostrar error
      return next.handle(request);
    }
  }

  mostrarMensajeError(e: HttpErrorResponse): void {
    // Errores 400
    if (e.status === 400) {
      const msg = `${CodigoError400.obtenerDescripcionError(e as Error400Res)}`;
      this.matSnackBar.open(msg, 'Cerrar', { duration: 60000, panelClass: 'snackbar-error-peticion-estado400' });
      return;
    }

    // El error 404 no muestra mensaje
    if (e.status === 404) {
      return;
    }

    // Para el resto de errores
    this.matSnackBar.open('No se ha podido cargar la página correctamente. Sentimos las molestias.', 'x', {
      verticalPosition: 'top',
      duration: 15000,
      panelClass: 'snackbar-error-peticion-general'
    });
  }
}
