import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useReducer } from "react";
import { Platform } from "react-native";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
	initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
	return useReducer(
		(
			_: [boolean, T | null],
			action: T | null = null
		): [boolean, T | null] => [false, action],
		initialValue
	);
}

export async function setStorageItemAsync(key: string, value: string | null) {
	if (Platform.OS === "web") {
		try {
			if (value === null) localStorage.removeItem(key);
			else localStorage.setItem(key, value);
		} catch (error) {
			console.error("Error setting storage item: ", error);
		}
	} else if (value == null) {
		await SecureStore.deleteItemAsync(key);
	} else {
		await SecureStore.setItemAsync(key, value);
	}
}

export function useStorageState(key: string): UseStateHook<string> {
	const [state, setState] = useAsyncState<string>();

	useEffect(() => {
		if (Platform.OS === "web") {
			try {
				if (typeof localStorage !== "undefined")
					setState(localStorage.getItem(key));
			} catch (error) {
				console.error("Error getting storage item: ", error);
			}
		} else {
			SecureStore.getItemAsync(key).then((value) => {
				setState(value);
			});
		}
	}, [key]);

	const setValue = useCallback(
		(value: string | null) => {
			setState(value);
			setStorageItemAsync(key, value);
		},
		[key]
	);

	return [state, setValue];
}