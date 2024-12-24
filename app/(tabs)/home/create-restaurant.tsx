import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Alert, Text } from "react-native";
import { publicarRestaurante } from "../../../services/restaurante/postRestaurante";
import { CreateRestauranteDTO } from "../../../interfaces/restaurantes/RestauranteDto";
import { createCarta } from "../../../services/carta/createCarta";

export default function CreateRestaurantScreen() {
  const [nombre, setNombre] = useState("");
  const [horario, setHorario] = useState("");
  const [tipoRestaurante, setTipoRestaurante] = useState("");
  const [carta, setCarta] = useState("");
  const [direccion, setDireccion] = useState("");
  const router = useRouter();

  const handleCreateRestaurant = async () => {
    if (!nombre || !horario || !tipoRestaurante || !carta || !direccion) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }
    const restaurante : CreateRestauranteDTO = {
      nombre_restaurante: nombre, horario: horario, tipoRestaurante: tipoRestaurante, direccion: direccion};
    const response = await publicarRestaurante(restaurante);
    await createCarta({nombre: carta, restauranteId: response.id_restaurante});
    Alert.alert("Éxito", `Restaurante "${nombre}" creado correctamente.`);
    if(router.canGoBack()){
        router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crear Restaurante</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Restaurante"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Horario"
        value={horario}
        onChangeText={setHorario}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de Restaurante"
        value={tipoRestaurante}
        onChangeText={setTipoRestaurante}
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de la Carta"
        value={carta}
        onChangeText={setCarta}
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreateRestaurant}>
        <Text style={styles.createButtonText}>Crear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: "#e86a10",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
