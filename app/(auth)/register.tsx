import { router } from "expo-router";
import React, { useState } from "react";
import { Text } from 'react-native';
import {TextInput} from "react-native-paper"
import { Alert, Button, View } from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import PasswordTextInput from "../../components/PasswordTextInput";
import AuthContainer from "../../components/AuthContainer";
import { DatePickerInput } from "react-native-paper-dates";

export default function Signup() {
	const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
	const [inputDate, setInputDate] = React.useState<Date | undefined>(new Date())
    const [date, setDate] = useState("");
	const [category, setCategory] = useState("CLIENTE");
	const [isLoading, setIsLoading] = useState(false);
	const authContext = useAuthContext();

	async function handleSignup() {
		if (inputDate != undefined){setDate(inputDate.toISOString());}
		if (
			name == "" ||
			email == "" ||
			phone == "" ||
			date == "" ||
			password == ""
		) {
			Alert.alert("Error", "Debes ingresar todos los campos");
			return;
		}

		try {
			
			setIsLoading(true);
			await authContext.signup({
				name,
				email,
				password,
				phone,
				date,
				category,

			});
			router.replace("/(tabs)/home");
		} catch (error) {
			Alert.alert("Error", "Ocurrió un error al intentar registrarte");
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<AuthContainer
			title={"Unete a Plateful Ya!"}
			buttonProps={{
				loading: isLoading,
				onPress: handleSignup,
				children: "Registrarse",
			}}
			textProps={{
				children: "¿Ya tienes cuenta en Plateful? ¡Ingresa!",
				onPress: () => router.push("/(auth)/logIn"),
			}}
		>
			<View style={{ flexDirection: "column", gap: 10 }}>
				<TextInput
					label="Nombre"
					value={name}
					onChangeText={(e)=>setName(e)}
				/>
				<TextInput
					label="Correo"
					value={email}
					onChangeText={(e)=>setEmail(e)}
				/>
				<TextInput
					label="Celular"
					value={phone}
					onChangeText={(e)=>setPhone(e)}
				/>
				<PasswordTextInput
					value={password}
					onChangeText={(e)=>setPassword(e)}
				/>
				<DatePickerInput
          			locale="en"
          			label="Fecha de Nacimiento"
          			value={inputDate}
          			onChange={(d) => {setInputDate(d);}}
          			inputMode="start"
          			style={{marginTop: 35, marginBottom: 5, height: 50}}
          			mode="outlined"
				/>
				<View style={{ marginTop: 35 }}>
					<Button
						title={`Cambiar a ${category === "CLIENTE" ? "PROPIETARIO" : "CLIENTE"}`}
						onPress={() => setCategory(category === "CLIENTE" ? "PROPIETARIO" : "CLIENTE")}
						color="#6750a4"
					/>
					<Text style={{ marginTop: 10 }}>
						<Text>Rol seleccionado:</Text>
					<Text style={{ fontWeight: "bold" ,textAlign: "center" }}>{category}</Text>
					</Text>
				</View>
			</View>
		</AuthContainer>
	);
}