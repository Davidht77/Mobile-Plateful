export interface PlatoDto{
      id_plato: number;
      nombre: string;
      precio: number;
      disponibilidad: boolean;
      id_carta: number;
}

export interface CreatePlatoDto{
      nombre: string;
      precio: number;
      disponibilidad: boolean;
      id_carta: number;
}