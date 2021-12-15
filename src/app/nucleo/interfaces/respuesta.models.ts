import { HttpErrorResponse } from '@angular/common/http';
// AUTORIZACIÓN ======================
export interface GetCodeResp {
  authorizationCode: string;
}

export interface PostTokenResp {
  fechaExpiracion: string;
}

export interface PostRefreshTokenResp {
  fechaExpiracion: string;
}
// ==================================

// ERROR 400 EN PETICION ============
export interface Error400Res extends HttpErrorResponse {
  timestamp?: string;
  path?: string;
  details?: {
    element?: string;
    code?: string;
    description?: string;
  }[];
}
// ==================================
