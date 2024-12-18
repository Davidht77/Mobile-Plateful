import { Stack } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks"
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getRestauranteById } from "../../services/restuarante/getRestaurante";
import { RestauranteDTO } from "../../interfaces/restaurantes/RestauranteDto";
import { validatePathConfig } from "expo-router/build/fork/getPathFromState-forks";

const DetailsPage = () =>{
    const vacio : RestauranteDTO = {
        id_restaurante: 0,
        nombre_restaurante: "",
        horario: "",
        tipoRestaurante: "",
        propietarioId: 0,
        cartaId: 0,
        calificacion_promedio: 0,
        ubicacionId: 0,
        latitude: 0,
        longitude: 0
    } 
    
    
    const searchParams = useSearchParams(); // Obtiene el objeto de búsqueda
    const [restaurante,setRestaurante] = useState<RestauranteDTO>(vacio);
    const id = searchParams.get("id"); // Accede al valor del parámetro 'id'

    const ObtenerRestaurante = async() =>{
        const response = await getRestauranteById(Number(id))
        setRestaurante(response);
    }

    useEffect(()=>{
        ObtenerRestaurante();
    },[])
        
    return(
        <View>
            <Stack.Screen options={{headerTitle: `Informacion de Restaurante #${id}`}}/>
            <Text>My Details for: {id}</Text>
            <Text>{restaurante.nombre_restaurante}</Text>
            <Text>Horario: {restaurante.horario}</Text>
            <Text>Tipo: {restaurante.tipoRestaurante}</Text>
            <Text>Califiacion Promedio: {restaurante.calificacion_promedio}</Text>
        </View>
    );
}

export default DetailsPage;