import { Link, Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function NotFoundScreen() {
	return (
		<>
			<Tabs.Screen
				options={{ title: "¡Cuidado! Esta screen no existe." }}
			/>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Link href="/(tabs)/home">Ir a la pantalla principal.</Link>
			</View>
		</>
	);
}
