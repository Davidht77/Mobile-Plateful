import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Button,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getUbication } from "../../../services/maps/getUbication";

export default function UserLocationMap() {
  const [location, setLocation] = useState(null); // Estado para la ubicación
  const [loading, setLoading] = useState(true);   // Estado de carga
  const [search, setSearch] = useState("");       // Estado para la búsqueda manual

  // Pedir ubicación al cargar la app
  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    setLoading(true); // Activar indicador de carga
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Se necesita el permiso de ubicación para usar esta función.");
        setLoading(false);
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener la ubicación del GPS. Inténtalo de nuevo o busca manualmente.");
    } finally {
      setLoading(false);
    }
  };

  // Simulación de búsqueda de ubicación manual
  const handleManualSearch = async () => {
    if (search.trim() === "") {
      Alert.alert("Error", "Por favor, escribe una ubicación válida.");
      return;
    }
    
    try {
        const response = await getUbication(search)

        setLocation({
            latitude: response.latitud,
            longitude: response.longitud,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
      
          Alert.alert("Éxito", `Ubicación seleccionada: ${search}`);
    }
    catch(e){Alert.alert("Error", `Error al obtener la ubicacion de: ${search}`);}

  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={location}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Estás aquí"
            description="Ubicación seleccionada"
          />
        </MapView>
      ) : (
        <View style={styles.retryContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe una ubicación..."
            placeholderTextColor="#bbb"
            value={search}
            onChangeText={setSearch}
          />
          <Button title="Buscar ubicación" onPress={handleManualSearch} />
        </View>
      )}

      <Button title="Reintentar ubicación GPS" onPress={getUserLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "90%",
  },
  retryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
});
