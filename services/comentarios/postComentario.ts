import { AxiosRequestConfig } from "axios";
import Api from "../api";
import * as SecureStore from "expo-secure-store";
import { ubicationResponse } from "../../interfaces/ubication/UbicationResponse";
import { ComentarioDTO, CreateComentarioDTO } from "../../interfaces/comentarios/ComentarioDto";

export async function publicarComentario(comentario: CreateComentarioDTO) {
    const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
    const options: AxiosRequestConfig = {
        url: "/comentarios",
        headers: {
            Authorization: `Bearer ${token}`,
          },
    };
    try {
        console.log(comentario);
        const response = await api.post<CreateComentarioDTO,ComentarioDTO>(
            comentario,
            options
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}