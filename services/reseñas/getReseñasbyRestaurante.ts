import { AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import Api from "../api";
import { PlatoDto } from "../../interfaces/plato/PlatoDto";
import { ResenaDTO } from "../../interfaces/reseña/ResenaDto";

export async function getResenasbyRestaurante(id: number) {
    const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
    const options: AxiosRequestConfig = {
        url: `/resenas/restaurante/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
          }
    };

    try {
        const response = await api.get<null,ResenaDTO[]>(
            options
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}