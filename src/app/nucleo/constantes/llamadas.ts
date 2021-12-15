/* eslint-disable prettier/prettier */
import { environment } from '../../../environments/environment';

// BASE
export const BASE_URL                   = `${environment.url}`;
export const PATH_BASE                  = 'cohessiona/progressa';
export const PATH_API_V01               = 'api/v01';


// REPOSITORIOS
export const PATH_PERSONAS_USUARIAS     = 'personas-usuarias';
export const PATH_AUTORIZACION          = 'auth';

// OPERACIONES
export const GET_PERSONAS_USUARIAS      = `${BASE_URL}/${PATH_BASE}/${PATH_API_V01}/${PATH_PERSONAS_USUARIAS}`;
export const GET_GRADOS_DEPENDENCIA     = `${BASE_URL}/${PATH_BASE}/${PATH_API_V01}/grados-dependencia`;
export const GET_TIPOS_DOMICILIO        = `${BASE_URL}/${PATH_BASE}/${PATH_API_V01}/tipos-domicilios-principales/<%=tipoDomicilioPrincipal%>/tipos-domicilio`;


// OPERACIONES AUTORIZACION
export const GET_CODE           = `${BASE_URL}/${PATH_BASE}/${PATH_API_V01}/${PATH_AUTORIZACION}/authorization-code`;
export const POST_TOKEN         = `${BASE_URL}/${PATH_BASE}/${PATH_API_V01}/${PATH_AUTORIZACION}/token`;
export const POST_REFRESH_TOKEN = `${BASE_URL}/${PATH_BASE}/${PATH_API_V01}/${PATH_AUTORIZACION}/refresh/token`;

// OPERACIONES AUTENTICACION
export const GET_LOGIN          = `${BASE_URL}/${PATH_BASE}/${PATH_API_V01}/${PATH_AUTORIZACION}/login?idp=CLA`; // Es una redirección
export const GET_LOGOUT         = `${BASE_URL}/${PATH_BASE}/${PATH_API_V01}/${PATH_AUTORIZACION}/logout`;
