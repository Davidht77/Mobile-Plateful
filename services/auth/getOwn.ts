import { AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import Api from "../api";
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
        console.log(response.data.role)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getOwnRole = async () =>{
    const response = await getOwnInformacion();
    return response.role;
}