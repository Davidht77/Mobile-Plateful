import { AxiosRequestConfig } from "axios";
import Api from "../api";
import * as SecureStore from "expo-secure-store";
import { ubicationResponse } from "../../interfaces/ubication/UbicationResponse";
import { ComentarioDTO, CreateComentarioDTO } from "../../interfaces/comentarios/ComentarioDto";
import { CreateResenaDTO, ResenaDTO } from "../../interfaces/reseña/ResenaDto";
import { CartaDto, CreateCartaDto } from "../../interfaces/carta/CartaDto";

export async function createCarta(carta: CreateCartaDto) {
    const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
    const options: AxiosRequestConfig = {
        url: "/cartas",
        headers: {
            Authorization: `Bearer ${token}`,
          },
    };
    try {
        const response = await api.post<CreateCartaDto,CartaDto>(
            carta,
            options
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}