import { router, Stack, useFocusEffect } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks"
import { useCallback, useEffect, useState } from "react";
import { View, Text, BackHandler } from "react-native";
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
        longitude: 0,
        nombre_propietario: "",
        nombre_carta: ""
    } 
    
    
    const searchParams = useSearchParams(); // Obtiene el objeto de búsqueda
    const [restaurante,setRestaurante] = useState<RestauranteDTO>(vacio);
    const id = searchParams.get("id"); // Accede al valor del parámetro 'id'

    const ObtenerRestaurante = async() =>{
        const response = await getRestauranteById(Number(id))
        setRestaurante(response);
    }

    // Hook para interceptar el botón de retroceso
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Redirige a la pantalla de restaurantes.tsx
        router.replace("/restaurantes");
        return true; // Bloquea la acción de retroceso predeterminada
      };

      // Suscribirse al evento de retroceso
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      // Limpiar la suscripción al salir de la pantalla
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [router])
  );

    useEffect(()=>{
        ObtenerRestaurante();
    },[])
        
    return(
        <View>
            <Stack.Screen options={{headerTitle: `Informacion de Restaurante`}}/>
            <Text className="text-4xl">{restaurante.nombre_restaurante}</Text>
            <Text>Dueño: {restaurante.nombre_propietario}</Text>
            <Text>Horario: {restaurante.horario}</Text>
            <Text>Tipo: {restaurante.tipoRestaurante}</Text>
            <Text>Califiacion Promedio: {restaurante.calificacion_promedio}</Text>
            <Text>Carta: {restaurante.nombre_carta}</Text>
        </View>
    );
}

export default DetailsPage;