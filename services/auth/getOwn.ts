import { AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import Api from "../api";
import { PlatoDto } from "../../interfaces/plato/PlatoDto";
import { ResenaDTO } from "../../interfaces/reseña/ResenaDto";
import { UsuarioDto } from "../../interfaces/auth/UsuarioDto";

export async function getOwnInformacion() {
    const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
    const options: AxiosRequestConfig = {
        url: `/usuarios/me`,
        headers: {
            Authorization: `Bearer ${token}`,
          }
    };

    try {
        const response = await api.get<null,UsuarioDto>(
            options
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}