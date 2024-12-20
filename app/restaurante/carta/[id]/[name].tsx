import { View, Text, FlatList } from "react-native";
import { useSearchParams } from "expo-router/build/hooks";
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { PlatoDto } from "../../../../interfaces/plato/PlatoDto";
import { getPlatosbyCarta } from "../../../../services/plato/getPlatosbyCarta";

export default function Carta() {
  const searchParams = useSearchParams(); // Obtiene el objeto de búsqueda
  const [platos, setPlatos] = useState<PlatoDto[]>([]);
  const id = searchParams.get("id");
  const name = searchParams.get("name");


    const ObtenerPlatos = async() =>{
        const response = await getPlatosbyCarta(Number(id))
        setPlatos(response);
    }


    useEffect(()=>{
      ObtenerPlatos();
      console.log("Platos Obtenidos")
    },[])

    return (
      <View className="flex-1 bg-gray-100">
        <Stack.Screen options={{ headerTitle: "Carta del Restaurante" }} />
        <FlatList
          data={platos}
          keyExtractor={(item) => item.id_plato.toString()}
          renderItem={({ item }) => (
            <View className="bg-white shadow-sm rounded-lg p-4 mb-3 mx-4 border border-gray-200">
              <Text className="text-lg font-bold text-gray-800">{item.nombre}</Text>
              <Text className="text-sm text-gray-600"> S/.{item.precio}</Text>
              <Text
                className={`text-sm font-semibold mt-1 ${
                  item.disponibilidad ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.disponibilidad ? "Disponible" : "No disponible"}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
        />
      </View>
    );
}
