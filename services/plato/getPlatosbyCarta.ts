import { AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import Api from "../api";
import { PlatoDto } from "../../interfaces/plato/PlatoDto";

export async function getPlatosbyCarta(id: number) {
    const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
    const options: AxiosRequestConfig = {
        url: `/platos/carta/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
          }
    };

    try {
        const response = await api.get<null,PlatoDto[]>(
            options
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}