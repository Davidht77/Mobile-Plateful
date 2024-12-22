import { useEffect, useState } from "react";
import { ResenaDTO } from "../../../interfaces/reseña/ResenaDto";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { getResenasbyRestaurante } from "../../../services/reseñas/getReseñasbyRestaurante";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Link, Stack } from "expo-router";
import { getOwnInformacion } from "../../../services/auth/getOwn";
import { publicarResena } from "../../../services/reseñas/postResena";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import { it } from "react-native-paper-dates";

const ListaReseñas = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Accede al valor del parámetro 'id'
  const router = useRouter(); // Hook para manejar rutas
  const [Reseñas, setReseñas] = useState<ResenaDTO[]>([]);
  const [nuevaReseña, setNuevaReseña] = useState("");
  const [rating, setRating] = useState(0);
  const [isWritingResena, setIsWritingResena] = useState(false); // Estado para mostrar u ocultar el formulario

  const ObtenerReseñas = async () => {
    const response = await getResenasbyRestaurante(Number(id));
    setReseñas(response);
  };

  const ObtenerUsuario = async () => {
    return await getOwnInformacion();
  };

  const publicarNuevaResena = async () => {
    if (nuevaReseña.trim() === "") {
      console.error("Debes escribir una reseña.");
      return;
    }

    try {
      const id_user = (await ObtenerUsuario()).id_usuario;
      await publicarResena({
        id_restaurante: Number(id),
        id_usuario: id_user,
        contenido: nuevaReseña,
        calificacion: Math.round(rating),
      });
      setNuevaReseña(""); // Limpiar el campo de texto
      setRating(0); // Restablecer la calificación
      setIsWritingResena(false); // Ocultar el formulario
      ObtenerReseñas(); // Actualizar lista de reseñas
      console.log("Reseña publicada correctamente");
    } catch (error) {
      console.error("Error al publicar la reseña", error);
    }
  };

  useEffect(() => {
    ObtenerReseñas();
    console.log("Reseñas Obtenidas");
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      <Stack.Screen options={{ headerTitle: `Lista de Reseñas` }} />

        {/* Botón para mostrar formulario */}
        {!isWritingResena && (
          <TouchableOpacity
            onPress={() => setIsWritingResena(true)}
            className="bg-orange-500 rounded-lg p-4 mb-4"
          >
            <Text className="text-white font-bold text-center">
              Escribir una Reseña
            </Text>
          </TouchableOpacity>
        )}

        {/* Formulario de reseña */}
        {isWritingResena && (
          <View className="bg-white p-4 border-gray-200">
            <TextInput
              value={nuevaReseña}
              onChangeText={setNuevaReseña}
              placeholder="Escribe tu reseña..."
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              className="bg-gray-100 rounded-lg p-3 text-gray-800"
              style={{
                height: 100, // Aumenta la altura del campo
                minHeight: 100,
              }}
            />
            
            <Text className="ml-2">Calificación: {
              <StarRating rating={rating} onChange={setRating} starSize={24} /> }</Text>
            
            <View className="flex-row justify-between mt-3">
              <TouchableOpacity
                onPress={() => setIsWritingResena(false)}
                className="bg-gray-700 rounded-lg px-4 py-2"
              >
                <Text className="text-white font-bold">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={publicarNuevaResena}
                className="bg-orange-500 rounded-lg px-4 py-2"
              >
                <Text className="text-white font-bold">Publicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Lista de reseñas */}
        <FlatList
          data={Reseñas}
          keyExtractor={(item) => item.id_resena.toString()}
          renderItem={({ item }) => (
            <View className="bg-white shadow-sm rounded-lg p-4 mb-3 mx-4 border border-black">
              <Link
                href={`/restaurante/resenas/comentarios/${item.id_resena}`}
                className="text-lg font-bold text-black"
              >
                {item.contenido}
              </Link>
              <Text className="text-lg">Calificación: {
                <StarRatingDisplay rating={item.calificacion} starSize={15}/>}</Text>
              <Text>Autor: {item.nombre_usuario}</Text>
              <Text>Fecha: {item.fecha}</Text>
            </View>
          )}
        />
    </KeyboardAvoidingView>
  );
};

export default ListaReseñas;
