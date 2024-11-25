import { AxiosRequestConfig } from "axios";
import Api from "../api";
import { ubicationResponse } from "../../interfaces/ubication/UbicationResponse";

export async function getUbication(ubication: string) {
	const api = await Api.getInstance();

	const options: AxiosRequestConfig = {
		url: "/geocode",
	};

	try {
		const response = await api.post<string, ubicationResponse>(
			ubication,
			options
		);
		return response.data;
	} catch (error) {
		throw error;
	}
}