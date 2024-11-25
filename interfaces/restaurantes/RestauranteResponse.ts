import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { ubicationResponse } from "../ubication/UbicationResponse";

export interface RestauranteResponse{
    nombre_restaurante: String ;
    horario: String ;
    tipoRestaurante: String ;
    calificacion_promedio: Double ;
    ubicacion: ubicationResponse ;
}