export interface DatosPluviometricosTr {
  pluviometro: {
    codigo: string;
    nombre: string;
  };
  provincia: {
    codigo: string;
    nombre: string;
  };
  precipitacionesHoraActual: string;
  precipitacionesUltimas12horas: string;
  precipitacionesAcumuladoHoy: string;
  precipitacionesAcumuladoAyer: string;
  precipitacionesUnidad: string;
  ubicacion?: {
    lat: number;
    lng: number;
  };
}
