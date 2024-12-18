import { AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import Api from "../api";
import { ubicationResponse } from "../../interfaces/ubication/UbicationResponse";
import { ubicationResquest } from "../../interfaces/ubication/UbicationRequest";
import { RestauranteResponse } from "../../interfaces/restaurantes/RestauranteResponse";
import { useStorageState } from "../../hooks/useStorageState";
import { RestauranteDTO } from "../../interfaces/restaurantes/RestauranteDto";

export async function getRestauranteById(id: number) {
	const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
    console.log(token);
	const options: AxiosRequestConfig = {
		url: `/restaurantes/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
          }
	};

	try {
		const response = await api.get<null,RestauranteDTO>(
			options
		);
		return response.data;
	} catch (error) {
		throw error;
	}
}