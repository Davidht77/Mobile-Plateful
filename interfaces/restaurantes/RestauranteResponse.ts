import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { ubicationResponse } from "../ubication/UbicationResponse";

export interface RestauranteResponse{
    id: number;
    nombre_restaurante: string ;
    horario: string ;
    tipoRestaurante: string ;
    calificacion_promedio: number ;
    ubicacion: ubicationResponse ;
}