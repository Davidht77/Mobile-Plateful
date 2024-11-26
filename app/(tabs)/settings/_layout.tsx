import { Stack } from "expo-router";

const StackLayout = () =>{
    return(
    <Stack>
        <Stack.Screen name="index" options={{headerTitle: "Settings", headerShown: false}}/>
        <Stack.Screen name="change-name-phone" options={{ title: "Cambiar Nombre y Celular" }} />
        <Stack.Screen name="change-photo" options={{ title: "Cambiar Foto de Perfil" }} />
    </Stack>
    );
};

export default StackLayout;