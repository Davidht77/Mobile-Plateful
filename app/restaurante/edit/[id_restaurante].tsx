import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Alert, Text } from "react-native";
import { publicarRestaurante } from "../../../services/restaurante/postRestaurante";
import { CreateRestauranteDTO, EditRestauranteDTO } from "../../../interfaces/restaurantes/RestauranteDto";
import { createCarta } from "../../../services/carta/createCarta";
import { editarRestaurante } from "../../../services/restaurante/editRestaurante";
import { useSearchParams } from "expo-router/build/hooks";

export default function CreateRestaurantScreen() {
  const [nombre, setNombre] = useState(null);
  const [horario, setHorario] = useState(null);
  const [tipoRestaurante, setTipoRestaurante] = useState(null);
  const [carta, setCarta] = useState(null);
  const [direccion, setDireccion] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id_restaurante"); // Accede al valor del parámetro 'id'

  const handleCreateRestaurant = async () => {
    if (!nombre && !horario && !tipoRestaurante && !carta && !direccion) {
      Alert.alert("Error", "Todos los campos estan vacios");
      return;
    }
    const restaurante : EditRestauranteDTO = {
      nombre_restaurante: nombre, nombre_carta: carta,horario: horario, tipoRestaurante: tipoRestaurante, direccion: direccion};
    const response = await editarRestaurante(Number(id),restaurante);
    Alert.alert("Éxito", `Información del Restaurante Actualizada correctamente.`);
    if(router.canGoBack()){
        router.back();
    }
  };

  return (
    <View style={styles.container}>
        <Stack.Screen options={{headerShown: false}}/>
      <Text style={styles.header}>Editar Informacion del Restaurante</Text>
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
        <Text style={styles.createButtonText}>Editar</Text>
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