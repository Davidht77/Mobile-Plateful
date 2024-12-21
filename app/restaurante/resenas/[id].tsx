import { useEffect, useState } from "react";
import { ResenaDTO } from "../../../interfaces/reseña/ResenaDto";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { getResenasbyRestaurante } from "../../../services/reseñas/getReseñasbyRestaurante";
import { View, Text, BackHandler, TouchableOpacity, FlatList } from "react-native";
import { Link, Stack } from "expo-router";


const ListaReseñas = () =>{

    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // Accede al valor del parámetro 'id'
    const router = useRouter(); // Hook para manejar rutas
    const [Reseñas, setReseñas] = useState<ResenaDTO[]>([]);

    const ObtenerReseñas= async() =>{
        const response = await getResenasbyRestaurante(Number(id))
        setReseñas(response)
    }

    useEffect(()=>{
        ObtenerReseñas();
        console.log("Reseñas Obtenidas")
    },[])

    return (
      <View className="flex-1 bg-white p-6">
          <Stack.Screen options={{ headerTitle: `Lista de Reseñas` }} />
          <FlatList
                data={Reseñas}
                keyExtractor={(item) => item.id_resena.toString()}
                renderItem={({ item }) => (
                  <View className='bg-orange-400 shadow-sm rounded-lg p-4 mb-3 mx-4 border border-gray-200'>
                    <Link href={`/restaurante/resenas/comentarios/${item.id_resena}`} className='text-lg font-bold text-black'>{item.contenido}</Link>
                    <Text className="text-lg">Calificación: {item.calificacion}</Text>
                    <Text>Autor: {item.nombre_usuario}</Text>
                    <Text>Fecha: {item.fecha}</Text>
                  </View>
                )}
              />
      </View>
      );
}

export default ListaReseñas;