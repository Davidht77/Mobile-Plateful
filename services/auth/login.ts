import { AxiosRequestConfig } from "axios";
import { LoginRequest } from "../../interfaces/auth/LoginResquest";
import Api from "../api";
import { AuthResponse } from "../../interfaces/auth/AuthResponse";
import { setStorageItemAsync } from "../../hooks/useStorageState";

export async function login(loginRequest: LoginRequest) {
	const api = await Api.getInstance();
	api.authorization = null;
	setStorageItemAsync("session",null);

	const options: AxiosRequestConfig = {
		url: "/auth/login",
	};

	try {
		const response = await api.post<LoginRequest, AuthResponse>(
			loginRequest,
			options
		);
		api.authorization = response.data.token;
		return response.data;
	} catch (error) {
		throw error;
	}
}