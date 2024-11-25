import { Stack } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks"
import { View, Text } from "react-native";

const DetailsPage = () =>{
    const searchParams = useSearchParams(); // Obtiene el objeto de búsqueda
    const id = searchParams.get("id"); // Accede al valor del parámetro 'id'
        
    return(
        <View>
            <Stack.Screen options={{headerTitle: `Details #${id}`}}/>
            <Text>My Details for: {id}</Text>
        </View>
    );
};

export default DetailsPage;