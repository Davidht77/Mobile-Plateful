import { createContext, ReactNode, useContext } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { LoginRequest } from "../interfaces/auth/LoginResquest";
import { RegisterRequest } from "../interfaces/auth/RegisterResquest";
import { login } from "../services/auth/login";
import { signup } from "../services/auth/signUp";
import Api from "../services/api";

interface AuthContextType {
	signup: (SignupRequest: RegisterRequest) => Promise<void>;
	login: (loginRequest: LoginRequest) => Promise<void>;
	logout: () => void;
	session?: string | null;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function loginHandler(
	loginRequest: LoginRequest,
	setSession: (value: string) => void
) {
	try {
		const response = await login(loginRequest);
		setSession(response.token);
	} catch (error) {
		throw error;
	}
}

async function signupHandler(
	signupRequest: RegisterRequest,
	setSession: (value: string) => void
) {
	try {
		const response = await signup(signupRequest);
		setSession(response.token);
	} catch (error) {
		throw error;
	}
}

export function AuthProvider(props: { children: ReactNode }) {
	const [[isLoading, session], setSession] = useStorageState("session");

	if (session)
		Api.getInstance().then((api) => {
			api.authorization = session;
		});

	return (
		<AuthContext.Provider
			value={{
				signup: (signupRequest) =>
					signupHandler(signupRequest, setSession),
				login: (loginRequest) => loginHandler(loginRequest, setSession),
				logout: () => {
					setSession(null);
				},
				session,
				isLoading,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error("useAuthContext must be used within a AuthProvider");
	return context;
}
