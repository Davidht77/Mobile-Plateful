import { AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import Api from "../api";
import { PlatoDto } from "../../interfaces/plato/PlatoDto";
import { ComentarioDTO } from "../../interfaces/comentarios/ComentarioDto";

export async function getComentariosbyResena(id_resena: number) {
    const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
    const options: AxiosRequestConfig = {
        url: `/comentarios/resena/${id_resena}`,
        headers: {
            Authorization: `Bearer ${token}`,
          }
    };

    try {
        const response = await api.get<null,ComentarioDTO[]>(
            options
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}