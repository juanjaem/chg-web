import { HttpErrorResponse } from '@angular/common/http';
import { DatosPluviometricosTr } from 'src/app/nucleo/interfaces/datos.models';

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

export type GetDatosPluviometricosTrResp = DatosPluviometricosTr[];
