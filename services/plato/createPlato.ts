import { AxiosRequestConfig } from "axios";
import Api from "../api";
import * as SecureStore from "expo-secure-store";
import { CartaDto, CreateCartaDto } from "../../interfaces/carta/CartaDto";
import { CreatePlatoDto } from "../../interfaces/plato/PlatoDto";

export async function createPlato(plato: CreatePlatoDto) {
    const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
    const options: AxiosRequestConfig = {
        url: "/platos",
        headers: {
            Authorization: `Bearer ${token}`,
          },
    };
    try {
        const response = await api.post<CreatePlatoDto,CartaDto>(
            plato,
            options
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}