import { AxiosRequestConfig } from "axios";
import Api from "../api";
import * as SecureStore from "expo-secure-store";
import { ubicationResponse } from "../../interfaces/ubication/UbicationResponse";
import { ComentarioDTO, CreateComentarioDTO } from "../../interfaces/comentarios/ComentarioDto";
import { CreateResenaDTO, ResenaDTO } from "../../interfaces/reseña/ResenaDto";

export async function publicarResena(resena: CreateResenaDTO) {
    const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
    const options: AxiosRequestConfig = {
        url: "/resenas",
        headers: {
            Authorization: `Bearer ${token}`,
          },
    };
    try {
        const response = await api.post<CreateResenaDTO,ResenaDTO>(
            resena,
            options
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}