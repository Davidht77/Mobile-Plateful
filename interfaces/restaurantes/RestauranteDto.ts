export interface RestauranteDTO {
    id_restaurante: number;
    nombre_restaurante: string;
    horario: string;
    tipoRestaurante: string;
    propietarioId: number;
    nombre_propietario: string ;
    cartaId: number;
    nombre_carta: string;
    calificacion_promedio: number;
    direccion: string;
    latitude: number;
    longitude: number;
  }
  