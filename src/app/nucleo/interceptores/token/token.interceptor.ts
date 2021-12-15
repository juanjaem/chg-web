import { Injectable } from '@angular/core';
import { PostRefreshTokenResp } from '../../interfaces/respuesta.models';
import { POST_REFRESH_TOKEN } from '../../constantes/llamadas';
import { TOKEN_AUTORIZACION, TOKEN__REFRESCO } from '../../constantes/local-storage';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, timeout, map } from 'rxjs';
import { mergeMap, filter, take, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

let jwtHelperService: JwtHelperService = new JwtHelperService();
let refrescandoToken: BehaviorSubject<any> = new BehaviorSubject(false);

@Injectable({
  providedIn: 'root'
})
export class TokenInterpector implements HttpInterceptor {
  constructor(private httpClient: HttpClient) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.get('adjuntarToken')) {
      // No adjutnar token a la petición
      return next.handle(request);
    } else {
      // Sí adjuntar token a la petición
      const token: string | undefined = localStorage.getItem(TOKEN_AUTORIZACION)?.split('Bearer')[1];
      // ¿Existe token?
      if (token) {
        // Sí existe token
        // ¿El token ha expirado?
        if (jwtHelperService.isTokenExpired(token)) {
          // Token expirado. Refrescarlo
          return this.obtenerNuevoToken().pipe(
            mergeMap((res: any) => {
              return next.handle(this.adjuntarToken(request));
            })
          );
        } else {
          // Token valido
          return next.handle(this.adjuntarToken(request));
        }
      } else {
        // No existe token
        throw new Error('Error inesperado: no se ha podido adjuntar token la petición porque no se ha encontrado en el Local Storage');
      }
    }
  }

  adjuntarToken(request: HttpRequest<any>) {
    const token = localStorage.getItem(TOKEN_AUTORIZACION) || ''; // Cuando llega aquí, existe token y es válido
    request = request.clone({
      setHeaders: {
        Authorization: token
      }
    });
    return request;
  }

  // Obtiene un nuevo token de acceso a partir del token de refresco.
  // Contiene un mecanismo para controlar que no existan refrescos de token simultaneos.
  obtenerNuevoToken(): Observable<void> {
    // ¿Está refrescando token?
    if (refrescandoToken.getValue()) {
      // Sí. Entonces devolver un observable que resuelve cuando termina el refresco.
      return refrescandoToken.pipe(
        filter((refrescando) => refrescando === false),
        take(1),
        map(() => {})
      );
    } else {
      // No. Entonces refrescar el token
      refrescandoToken.next(true);

      const tokenRefresco = localStorage.getItem(TOKEN__REFRESCO);
      if (!tokenRefresco) {
        throw new Error('Error inesperado: No se ha encontrado ningún token de refresco');
      }

      const headers = new HttpHeaders();
      headers.append('Autorization', tokenRefresco);

      return this.httpClient.post<HttpResponse<PostRefreshTokenResp>>(POST_REFRESH_TOKEN, {}, { headers }).pipe(
        timeout(10000),
        map((res) => {
          localStorage.setItem(TOKEN_AUTORIZACION, res.headers.get('authorization') || '');
          localStorage.setItem(TOKEN__REFRESCO, res.headers.get('authorization-refresh') || '');
          refrescandoToken.next(false);
          return;
        }),
        catchError((e) => {
          refrescandoToken.next(false);
          console.error('Error al refrescar el token');
          throw e;
        })
      );
    }
  }
}
