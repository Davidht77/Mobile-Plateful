import { PropsWithChildren } from "react";
import { Image } from "react-native";
import { Button, ButtonProps, Text, TextProps } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/Colors";

interface AuthContainerProps extends PropsWithChildren {
	title: string;
	buttonProps: ButtonProps;
	textProps: TextProps<string>;
}

export default function AuthContainer(props: AuthContainerProps) {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				flexDirection: "column",
				gap: 40,
				justifyContent: "center",
				padding: 25,
			}}
		>
			<Image
				source={require("../assets/images/favicon.png")}
				style={{
					width: 100,
					height: 100,
					borderRadius: 50,
					alignSelf: "center",
				}}
			/>

			<Text
				variant="headlineMedium"
				style={{ textAlign: "center", fontWeight: "bold" }}
			>
				{props.title}
			</Text>

			{props.children}

			<Button {...props.buttonProps} mode="contained">
				{props.buttonProps.children}
			</Button>

			<Text
				{...props.textProps}
				style={{ color: COLORS.dimGray, textAlign: "center" }}
				variant="labelLarge"
			>
				{props.textProps.children}
			</Text>
		</SafeAreaView>
	);
}
