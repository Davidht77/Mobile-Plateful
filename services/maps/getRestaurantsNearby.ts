import { AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import Api from "../api";
import { ubicationResquest } from "../../interfaces/ubication/UbicationRequest";
import { RestauranteResponse } from "../../interfaces/restaurantes/RestauranteResponse";

export async function getUbicationNearby(ubication: ubicationResquest) {
	const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
	const options: AxiosRequestConfig = {
		url: "/restaurantes",
        headers: {
            Authorization: `Bearer ${token}`,
          },
	};

	try {
		const response = await api.get<null,RestauranteResponse[]>(
			ubication,
			options
		);
		return response.data;
	} catch (error) {
		throw error;
	}
}