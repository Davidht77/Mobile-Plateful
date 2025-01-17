import { AxiosRequestConfig } from "axios";
import Api from "../api";
import * as SecureStore from "expo-secure-store";
import { CreateRestauranteDTO, RestauranteDTO } from "../../interfaces/restaurantes/RestauranteDto";
import { RestauranteResponse } from "../../interfaces/restaurantes/RestauranteResponse";

export async function publicarRestaurante(restaurante: CreateRestauranteDTO) {
    const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
    const options: AxiosRequestConfig = {
        url: "/restaurantes/create",
        headers: {
            Authorization: `Bearer ${token}`,
          },
    };
    try {
        const response = await api.post<CreateRestauranteDTO,RestauranteResponse>(
            restaurante,
            options
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}