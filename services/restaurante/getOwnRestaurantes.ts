import { AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import Api from "../api";
import { RestauranteDTO } from "../../interfaces/restaurantes/RestauranteDto";
import { RestauranteResponse } from "../../interfaces/restaurantes/RestauranteResponse";

export async function getRestauranteByOwner(id: number) {
    const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
    const options: AxiosRequestConfig = {
        url: `/restaurantes/propietario/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
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