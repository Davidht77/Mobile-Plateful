import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Stack } from "expo-router";
import { getComentariosbyResena } from "../../../../services/comentarios/getComentariosbyReseña";
import { ComentarioDTO } from "../../../../interfaces/comentarios/ComentarioDto";
import { getResenasbyId } from "../../../../services/reseñas/getRestaurantebyId";
import { publicarComentario } from "../../../../services/comentarios/postComentario";
import { ResenaDTO } from "../../../../interfaces/reseña/ResenaDto";
import { getOwnInformacion } from "../../../../services/auth/getOwn";

const ListaComentarios = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Accede al valor del parámetro 'id'
  const router = useRouter(); // Hook para manejar rutas

  const [comentarios, setComentarios] = useState<ComentarioDTO[]>([]);
  const [resena, setResena] = useState<ResenaDTO>(null);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [role, setRole] = useState<string | null>(null);

  // Funciones para obtener datos
  const obtenerComentarios = async () => {
    const response = await getComentariosbyResena(Number(id));
    setComentarios(response);
  };

  const obtenerResena = async () => {
    const response = await getResenasbyId(Number(id));
    setResena(response);
  };

  const ObtenerUsuario = async () => {
    const response = await getOwnInformacion();
    setRole(response.role);
    return response;
  }

  const publicarNuevoComentario = async () => {
    if (nuevoComentario.trim() === "") return;

    try {
      const id_user = (await ObtenerUsuario()).id_usuario; 
      await publicarComentario({id_resena: Number(id), id_usuario: id_user, contenido: nuevoComentario});
      setNuevoComentario(""); // Limpiar el campo de texto
      obtenerComentarios(); // Actualizar lista de comentarios
      console.log("Comentarios Obtenidos");
    } catch (error) {
      console.error("Error al publicar el comentario", error);
    }
  };

  useEffect(() => {
    obtenerComentarios();
    obtenerResena();
  }, []);

  return (
    <View className="flex-1 bg-gray-100">
      <Stack.Screen options={{ headerTitle: `Reseña` }} />

      {resena && (
        <View className="bg-white shadow-sm rounded-lg p-4 mb-3 mt-3 mx-4 border border-gray-200">
          <Text className="text-xl font-bold text-gray-800 mb-2">{resena.contenido}</Text>
          <Text className="text-sm text-gray-600 mt-2">Escrito por: {resena.nombre_usuario}</Text>
          <Text className="text-sm text-gray-600">Fecha: {resena.fecha}</Text>
        </View>
      )}

      <FlatList
        data={comentarios}
        keyExtractor={(item) => item.id_resena.toString()}
        renderItem={({ item }) => (
          <View className="bg-white shadow-sm rounded-lg p-4 mb-3 mx-4 border border-gray-200">
            <Text className="text-lg font-bold text-gray-800">{item.contenido}</Text>
            <Text className="text-sm text-gray-600">Escrito por: {item.nombre_usuario}</Text>
            <Text className="text-sm text-gray-600">Fecha: {item.fecha}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
      />

      {/* Barra para publicar comentarios */}
      { role == "ROLE_CLIENTE" && (
      <View className="bg-white p-4 border-t border-gray-200 flex-row items-center">
        <TextInput
          value={nuevoComentario}
          onChangeText={setNuevoComentario}
          placeholder="Escribe tu comentario..."
          className="flex-1 bg-gray-100 rounded-lg p-3 text-gray-800"
        />
        <TouchableOpacity
          onPress={publicarNuevoComentario}
          className="bg-orange-500 rounded-lg ml-3 px-4 py-2"
        >
          <Text className="text-white font-bold">Publicar</Text>
        </TouchableOpacity>
      </View>
      )}
    </View>
  );
};

export default ListaComentarios;
