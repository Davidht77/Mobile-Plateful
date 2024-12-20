import { AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import Api from "../api";
import { ubicationResquest } from "../../interfaces/ubication/UbicationRequest";
import { RestauranteResponse } from "../../interfaces/restaurantes/RestauranteResponse";

export async function getUbicationNearby(ubication: ubicationResquest) {
	const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
	const options: AxiosRequestConfig = {
		url: "/restaurantes/nearby",
		method: "GET",
		headers: {
		  Authorization: `Bearer ${token}`,
		},
		params: {
		  latitud: -12.1352054,
		  longitud: -77.0221411
		},
	  };

	try {
		const response = await api.request<null,RestauranteResponse[]>(
			options
		);
		return response.data;
	} catch (error) {
		throw error;
	}
}