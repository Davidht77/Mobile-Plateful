import { Stack } from "expo-router"
import {Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from "../contexts/AuthContext";
import CustomTheme from "../constants/Colors";
import "../tailwind.css";

const StackLayout = () =>{
    return(
        <PaperProvider theme={CustomTheme}>
            <AuthProvider>
                <Stack>
                    <Stack.Screen name="(auth)"options={{headerShown: false}} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </AuthProvider>
        </PaperProvider>
    );
};

export default StackLayout;