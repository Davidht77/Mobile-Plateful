import { router, Stack, useFocusEffect } from "expo-router";
import { useRouter, useSearchParams } from "expo-router/build/hooks"
import { useCallback, useEffect, useState } from "react";
import { View, Text, BackHandler, TouchableOpacity } from "react-native";
import { getRestauranteById } from "../../services/restaurante/getRestaurante";
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
    const router = useRouter(); // Hook para manejar rutas

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
        
    return (
      <View className="flex-1 bg-white p-6">
        <Stack.Screen options={{ headerTitle: `Información de Restaurante` }} />
  
        <Text className="text-4xl font-bold text-gray-800 text-center mb-6">
          {restaurante.nombre_restaurante}
        </Text>
  
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-500">Dueño:</Text>
          <Text className="text-lg text-gray-700">{restaurante.nombre_propietario}</Text>
        </View>
  
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-500">Horario:</Text>
          <Text className="text-lg text-gray-700">{restaurante.horario}</Text>
        </View>
  
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-500">Tipo de Restaurante:</Text>
          <Text className="text-lg text-gray-700">{restaurante.tipoRestaurante}</Text>
        </View>
  
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-500">Calificación Promedio:</Text>
          <Text className="text-lg text-gray-700">{restaurante.calificacion_promedio}</Text>
        </View>
  
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-500">Carta:</Text>
          <Text className="text-lg text-gray-700">{restaurante.nombre_carta}</Text>
        </View>

        <View className="flex-1 justify-end items-center">
        <TouchableOpacity
          className="bg-orange-500 rounded-full py-3 px-6 mb-4"
          onPress={
            () => {
              const route = `/restaurante/carta/${restaurante.cartaId}/${restaurante.nombre_carta}`;
              router.push(route);
            }
          }
        >
          <Text className="text-white font-semibold text-lg">Ver Carta</Text>
        </TouchableOpacity>
      </View>

      </View>
    );
}

export default DetailsPage;