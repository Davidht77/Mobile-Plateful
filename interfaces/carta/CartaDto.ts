export interface CartaDto{
     id_carta: number;
     nombre: string;
     fecha_actualizacion: string;
     nombre_restaurante: string;
}

export interface CreateCartaDto{
     nombre: string;
     restauranteId: number;
}