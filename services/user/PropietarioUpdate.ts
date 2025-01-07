import { AxiosRequestConfig } from "axios";
import Api from "../api";
import * as SecureStore from "expo-secure-store";
import { UsuarioDto } from "../../interfaces/auth/UsuarioDto";
import { EditUsuarioDTO } from "../../interfaces/user/EditUserDTO";
import { UpdatePropietarioDTO } from "../../interfaces/user/EditPropietarioDTO";

export async function editarDocumentosPropietario(propietario: UpdatePropietarioDTO) {
    const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
    const options: AxiosRequestConfig = {
        url: `/usuarios/update`,
        headers: {
            Authorization: `Bearer ${token}`,
          },
    };
    try {
        const response = await api.patch<UpdatePropietarioDTO,UsuarioDto>(
            propietario,
            options
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}