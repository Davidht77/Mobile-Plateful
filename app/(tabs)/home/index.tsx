import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getUbication } from "../../../services/maps/getUbication";

export default function UserLocationMap() {
  const [location, setLocation] = useState(null); // Estado para la ubicación
  const [loading, setLoading] = useState(true); // Estado de carga
  const [search, setSearch] = useState(""); // Estado para la búsqueda manual
  const [nombre_lugar, setLugar] = useState("");

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Se necesita el permiso de ubicación para usar esta función."
        );
        setLoading(false);
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLugar("Aquí te encuentras");
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo obtener la ubicación del GPS. Inténtalo de nuevo o busca manualmente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = async () => {
    if (search.trim() === "") {
      Alert.alert("Error", "Por favor, escribe una ubicación válida.");
      return;
    }

    try {
      const response = await getUbication(search);
      setLocation({
        latitude: response.latitud,
        longitude: response.longitud,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      Alert.alert("Éxito", `Ubicación seleccionada: ${response.direccionCompleta}`);
      setLugar(response.direccionCompleta);
    } catch (e) {
      Alert.alert("Error", `Error al obtener la ubicación de: ${search}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e86a10" />
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.centerContainer}>
        <Text>Esperando ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe una ubicación..."
          placeholderTextColor="#bbb"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleManualSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        region={location}
        googleMapId="8ee6041ae9d57958"
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Tu Ubicación"
          description={nombre_lugar}
        />
      </MapView>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={getUserLocation}
      >
        <Text style={styles.retryButtonText}>Reintentar GPS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
    marginTop: 10,
    borderRadius: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    marginRight: 10,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#e86a10",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  retryButton: {
    backgroundColor: "#e86a10",
    margin: 20,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
