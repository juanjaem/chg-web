export interface DatosPluviometricosTr {
  pluviometro: {
    codigo: string;
    nombreWeb: string;
    nombrePdf?: string;
  };
  provincia: {
    codigo: string;
    nombre: string;
  };
  municipio?: string;
  precipitacionesHoraActual: number;
  precipitacionesHoraAnterior: number;
  precipitacionesUltimas12horas: number;
  precipitacionesAcumuladoHoy: number;
  precipitacionesAcumuladoAyer: number;
  precipitacionesUnidad: string;
  coordenadasDecimal?: {
    lat: number;
    lng: number;
  };
}
