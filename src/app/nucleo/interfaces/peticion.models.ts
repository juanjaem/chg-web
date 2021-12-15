// AUTENTICACIÓN ===================
export interface GetCodeReq {
  params: [{ nombre: 'idp'; valor: string }];
}

export interface PostTokenReq {
  params: [{ nombre: 'sistemaInformacion'; valor: string }, { nombre: 'code'; valor: string }];
}

export interface PostRefreshTokenReq {
  headers: [{ nombre: 'Authorization'; valor: string }];
}
// ==================================
