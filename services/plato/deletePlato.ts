import { AxiosRequestConfig } from "axios";
import Api from "../api";
import * as SecureStore from "expo-secure-store";

export async function deletePlato(id_plato: number) {
    const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
    const options: AxiosRequestConfig = {
        url: `/platos/${id_plato}`,
        headers: {
            Authorization: `Bearer ${token}`,
          },
    };
    try {
        const response = await api.delete(
            options
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}