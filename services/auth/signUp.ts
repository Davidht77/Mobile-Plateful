import { AuthResponse } from "../../interfaces/auth/AuthResponse";
import { RegisterRequest } from "../../interfaces/auth/RegisterResquest";
import Api from "../api";

export async function signup(signupRequest: RegisterRequest) {
	const api = await Api.getInstance();

	const options = {
		url: "/auth/register",
	};

	try {
		console.log(signupRequest);
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
