import { View, Text, FlatList, Button, Modal, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useSearchParams } from "expo-router/build/hooks";
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { CreatePlatoDto, PlatoDto } from "../../../../interfaces/plato/PlatoDto";
import { getPlatosbyCarta } from "../../../../services/plato/getPlatosbyCarta";
import { deletePlato } from "../../../../services/plato/deletePlato";
import { updatePlato } from "../../../../services/plato/updatePlato";
import { createPlato } from "../../../../services/plato/createPlato";
import { getOwnRole } from "../../../../services/auth/getOwn";

export default function Carta() {
  const searchParams = useSearchParams(); // Obtiene el objeto de búsqueda
  const [platos, setPlatos] = useState<PlatoDto[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPlato, setEditingPlato] = useState<PlatoDto | null>(null);
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [newPlato, setNewPlato] = useState<CreatePlatoDto>({ nombre: "", precio: 0 , disponibilidad: true, id_carta: Number(id)});

  const router = useRouter();

  const ObtenerPlatos = async () => {
    const response = await getPlatosbyCarta(Number(id));
    setPlatos(response);
  };

  const ObtenerRol = async () => {
    const response = await getOwnRole();
    setRole(response);
  };

  const handleDelete = async (platoId: number) => {
    try {
      await deletePlato(platoId);
      Alert.alert("Éxito", "Plato eliminado correctamente.");
      ObtenerPlatos();
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el plato.");
    }
  };

  const handleSave = async () => {
    try {
      if (editingPlato) {
        await updatePlato(0);
        Alert.alert("Éxito", "Plato actualizado correctamente.");
      } else {
        await createPlato(newPlato);
        Alert.alert("Éxito", "Plato creado correctamente.");
      }
      setModalVisible(false);
      setNewPlato({ nombre: "", precio: 0, disponibilidad: true, id_carta: Number(id)});
      setEditingPlato(null);
      ObtenerPlatos();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el plato.");
    }
  };

  useEffect(() => {
    ObtenerPlatos();
    ObtenerRol();
  }, []);

  return (
    <View className="flex-1 bg-gray-100">
      <Stack.Screen options={{ headerTitle: "Carta del Restaurante" }} />
      <FlatList
        data={platos}
        keyExtractor={(item) => item.id_plato.toString()}
        renderItem={({ item }) => (
          <View className="bg-white shadow-sm rounded-lg p-4 mb-3 mx-4 border border-gray-200">
            <Text className="text-lg font-bold text-gray-800">{item.nombre}</Text>
            <Text className="text-sm text-gray-600">S/.{item.precio}</Text>
            <Text
              className={`text-sm font-semibold mt-1 ${
                item.disponibilidad ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.disponibilidad ? "Disponible" : "No disponible"}
            </Text>
            {role === "ROLE_PROPIETARIO" && (
              <View className="flex-row mt-2">
                <TouchableOpacity
                  className="bg-blue-500 p-2 rounded mr-2"
                  onPress={() => {
                    setEditingPlato(item);
                    setNewPlato({
                      nombre: item.nombre,
                      precio: item.precio,
                      disponibilidad: item.disponibilidad,
                      id_carta: Number(id)
                    });
                    setModalVisible(true);
                  }}
                >
                  <Text className="text-white">Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-red-500 p-2 rounded"
                  onPress={() => handleDelete(item.id_plato)}
                >
                  <Text className="text-white">Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Este restaurante no tiene platos aún.</Text>
          </View>
        }
      />
      {role === "ROLE_PROPIETARIO" && (
        <TouchableOpacity
          className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center absolute bottom-10 right-10 shadow-lg"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white text-center">+</Text>
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible} animationType="slide">
        <View className="flex-1 justify-center p-4 bg-gray-100">
          <TextInput
            placeholder="Nombre del Plato"
            value={newPlato.nombre}
            onChangeText={(text) => setNewPlato({ ...newPlato, nombre: text })}
            className="bg-white p-2 mb-3 rounded border border-gray-300"
          />
          <TextInput
            placeholder="Precio del Plato"
            value={newPlato.precio.toString()}
            onChangeText={(text) => setNewPlato({ ...newPlato, precio: Number(text) })}
            keyboardType="numeric"
            className="bg-white p-2 mb-3 rounded border border-gray-300"
          />
          <View className="flex-row items-center mb-3">
            <Text className="mr-2">Disponible:</Text>
            <Button
              title={newPlato.disponibilidad ? "Sí" : "No"}
              onPress={() =>
                setNewPlato({
                  ...newPlato,
                  disponibilidad: !newPlato.disponibilidad,
                })
              }
            />
          </View>
          <View className="flex-row justify-between">
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            <Button title="Guardar" onPress={handleSave} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  }
}
)