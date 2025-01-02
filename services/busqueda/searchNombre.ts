import { AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import Api from "../api";
import { RestauranteResponse } from "../../interfaces/restaurantes/RestauranteResponse";

export async function getRestauranteByNombre(nombre1: string, page1: number) {
    const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
    const options: AxiosRequestConfig = {
        url: `/restaurantes/nombre`,
        headers: {
            Authorization: `Bearer ${token}`,
          },
        params: {
            nombre: nombre1,
            page: page1,
            size: 10,
        }
    };

    try {
        const response = await api.get<null,RestauranteResponse[]>(
            options
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}