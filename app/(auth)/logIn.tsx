import { router } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import { TextInput } from "react-native-paper";
import AuthContainer from "../../components/AuthContainer";
import { useAuthContext } from "../../contexts/AuthContext";
import PasswordTextInput from "../../components/PasswordTextInput";

export default function LogInScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const authContext = useAuthContext();

	async function handleLogin() {
		if (email == "" || password == "") {
			Alert.alert("Error", "Debes ingresar usuario y contraseña");
			return;
		}

		try {
			setIsLoading(true);
			await authContext.login({ email, password });
			router.replace("/(tabs)/home");
		} catch (error) {
			Alert.alert("Error", "Ocurrió un error al intentar ingresar");
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<AuthContainer
			title={"Plateful"}
			buttonProps={{
				loading: isLoading,
				onPress: handleLogin,
				children: "Ingresar",
			}}
			textProps={{
				children: "¿No tienes cuenta en Plateful? ¡Créala!",
				onPress: () => router.push("/(auth)/register"),
			}}
		>
			<View style={{ flexDirection: "column", gap: 20 }}>
				<TextInput
					label="Correo"
					value={email}
					onChangeText={(e)=>{setEmail(e)}}
				/>
				<PasswordTextInput
					value={password}
					onChangeText={(e)=>{setPassword(e)}}
				/>
			</View>
		</AuthContainer>
	);
}