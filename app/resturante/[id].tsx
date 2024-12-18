import { Stack } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks"
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getRestauranteById } from "../../services/restuarante/getRestaurante";
import { RestauranteDTO } from "../../interfaces/restaurantes/RestauranteDto";

const DetailsPage = () =>{
    const searchParams = useSearchParams(); // Obtiene el objeto de búsqueda
    const [restaurante,setRestaurante] = useState<RestauranteDTO>();
    const id = searchParams.get("id"); // Accede al valor del parámetro 'id'

    const ObtenerRestaurante = async() =>{
        const response = await getRestauranteById(Number(id))
        setRestaurante(response);
    }

    useEffect(()=>{
    },[])
        
    return(
        <View>
            <Stack.Screen options={{headerTitle: `Details #${id}`}}/>
            <Text>My Details for: {id}</Text>
            <Text>
            
            </Text>
        </View>
    );
};

export default DetailsPage;