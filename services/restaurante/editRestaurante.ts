import { AxiosRequestConfig } from "axios";
import Api from "../api";
import * as SecureStore from "expo-secure-store";
import { CreateRestauranteDTO, EditRestauranteDTO, RestauranteDTO } from "../../interfaces/restaurantes/RestauranteDto";

export async function editarRestaurante(id_restaurante: number,restaurante: EditRestauranteDTO) {
    const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
    const options: AxiosRequestConfig = {
        url: `/restaurantes/edit/${id_restaurante}`,
        headers: {
            Authorization: `Bearer ${token}`,
          },
    };
    try {
        const response = await api.patch<EditRestauranteDTO,RestauranteDTO>(
            restaurante,
            options
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}