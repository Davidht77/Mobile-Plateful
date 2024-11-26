import { AxiosRequestConfig } from "axios";
import Api from "../api";
import * as SecureStore from "expo-secure-store";
import { ubicationResponse } from "../../interfaces/ubication/UbicationResponse";

export async function getUbication(ubication: string) {
	const api = await Api.getInstance();
    const token = await SecureStore.getItemAsync("session");
	const options: AxiosRequestConfig = {
		url: "/geocode",
        headers: {
            Authorization: `Bearer ${token}`,
          },
		  params : {address: ubication}
	};
	try {
		const response = await api.get<null,ubicationResponse>(null,
			options
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		throw error;
	}
}