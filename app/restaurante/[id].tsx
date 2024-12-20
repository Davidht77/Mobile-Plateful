import { router, Stack, useFocusEffect } from "expo-router";
import { useRouter, useSearchParams } from "expo-router/build/hooks"
import { useCallback, useEffect, useState } from "react";
import { View, Text, BackHandler, TouchableOpacity } from "react-native";
import { getRestauranteById } from "../../services/restaurante/getRestaurante";
import { RestauranteDTO } from "../../interfaces/restaurantes/RestauranteDto";
import MapView, { Marker } from "react-native-maps";


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
    const roundedLatitude = parseFloat(restaurante.longitude.toFixed(6));
    const roundedLongitude = parseFloat(restaurante.latitude.toFixed(6));

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
        console.log(roundedLongitude); // -77.022141
        console.log(roundedLatitude);  // -12.135205
    },[])

    const isValidCoordinates =
    roundedLatitude !== 0 && roundedLongitude !== 0;
        
    return (
      <View className="flex-1 bg-white p-6">
        <Stack.Screen options={{ headerTitle: `Información de Restaurante` }} />
  
        <Text className="text-4xl font-bold text-gray-800 text-center mb-6">
          {restaurante.nombre_restaurante}
        </Text>
      <View className="flex-row justify-between mb-1">
        <View className="flex-1 mr-2">
          <Text className="text-sm font-medium text-gray-500">Dueño:</Text>
          <Text className="text-lg text-gray-700">{restaurante.nombre_propietario}</Text>

          <Text className="text-sm font-medium text-gray-500">Horario:</Text>
          <Text className="text-lg text-gray-700">{restaurante.horario}</Text>

          <Text className="text-sm font-medium text-gray-500">Carta:</Text>
          <Text className="text-lg text-gray-700">{restaurante.nombre_carta}</Text>
        </View>
  
        <View className="flex-1 ml-2">
          <Text className="text-sm font-medium text-gray-500">Tipo de Restaurante:</Text>
          <Text className="text-lg text-gray-700">{restaurante.tipoRestaurante}</Text>

          <Text className="text-sm font-medium text-gray-500">Calificación Promedio:</Text>
          <Text className="text-lg text-gray-700">{restaurante.calificacion_promedio}</Text>

        </View>
      </View>

      {isValidCoordinates ? (
        <MapView
          style={{ height: 300, borderRadius: 10, marginBottom: 16 }}
          provider="google"
          initialRegion={{
            latitude: roundedLatitude,
            longitude: roundedLongitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          googleMapId="8ee6041ae9d57958"
        >
          <Marker
            coordinate={{
              latitude: roundedLatitude,
              longitude: roundedLongitude,
            }}
            title={restaurante.nombre_restaurante}
            description={`Ubicación de ${restaurante.nombre_restaurante}`}
          />
        </MapView>
      ) : (
        <View
          style={{
            height: 300,
            borderRadius: 10,
            marginBottom: 16,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Text className="text-gray-500">
            Ubicación no disponible para este restaurante.
          </Text>
        </View>
      )}

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