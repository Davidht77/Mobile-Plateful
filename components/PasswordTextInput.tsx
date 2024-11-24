import { useState } from "react";
import {TextInput, TextInputProps} from "react-native-paper";
interface PasswordTextInputProps extends TextInputProps {}

export default function PasswordTextInput(props: PasswordTextInputProps) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	return (
		<TextInput
			{...props}
			label={"Contraseña"}
			secureTextEntry={!isPasswordVisible}
			right={
				<TextInput.Icon
					icon={isPasswordVisible ? "eye-off" : "eye"}
					onPress={() => setIsPasswordVisible(!isPasswordVisible)}
				/>
			}
		/>
	);
}