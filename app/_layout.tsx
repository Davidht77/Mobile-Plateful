import { Stack } from "expo-router"
import { AuthProvider } from "../contexts/AuthContext";

const StackLayout = () =>{
    return(
        <AuthProvider>
            <Stack>
                <Stack.Screen name="(auth)"options={{headerShown: false}} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>
    );
};

export default StackLayout;