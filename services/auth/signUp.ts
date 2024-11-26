import { setStorageItemAsync } from "../../hooks/useStorageState";
import { AuthResponse } from "../../interfaces/auth/AuthResponse";
import { RegisterRequest } from "../../interfaces/auth/RegisterResquest";
import Api from "../api";

export async function signup(signupRequest: RegisterRequest) {
	const api = await Api.getInstance();
	api.authorization = null;
	setStorageItemAsync("session",null);

	const options = {
		url: "/auth/register",
	};

	try {
		const response = await api.post<RegisterRequest, AuthResponse>(
			signupRequest,
			options
		);
		console.log(response.data.role);
		return response.data;
	} catch (error) {
		throw error;
	}
}
