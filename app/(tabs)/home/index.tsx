import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getUbication } from "../../../services/maps/getUbication";
import { getOwnInformacion, getOwnRole } from "../../../services/auth/getOwn";
import { getRestauranteByOwner } from "../../../services/restaurante/getOwnRestaurantes";
import { Stack, useRouter } from "expo-router";
import { RestauranteDTO } from "../../../interfaces/restaurantes/RestauranteDto";

export default function UserLocationMap() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(""); // Estado para el rol
  const [search, setSearch] = useState("");
  const [nombre_lugar, setLugar] = useState("");
  const [restaurants, setRestaurants] = useState<RestauranteDTO[]>([]); // Estado para los restaurantes
  const router = useRouter();

  const fetchRoleAndData = async () => {
    try {
      const user = await getOwnInformacion();
      const userRole = user.role;
       // Obtiene el rol del usuario
      setRole(userRole);

      if (userRole === "Propietario") {
        const propietarioRestaurants = await getRestauranteByOwner(Number(user.id_usuario))
        setRestaurants(propietarioRestaurants);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener el rol del usuario.");
    }
  };

  useEffect(() => {
    getUserLocation();
    fetchRoleAndData();
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

  if (role === "ROLE_CLIENTE") {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{headerTitle: "Tu ubicacion"}}/>
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

  if (role === "ROLE_PROPIETARIO") {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{headerTitle: "Tus Restaurantes"}}/>       
        {restaurants.length === 0 ? (
          // Mostrar mensaje si no hay restaurantes
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No tienes restaurantes creados aún.
            </Text>
          </View>
        ) : (
          // Mostrar la lista de restaurantes si existen
          <FlatList
            data={restaurants}
            keyExtractor={(item) => item.id_restaurante.toString()}
            renderItem={({ item }) => (
              <View style={styles.restaurantItem}>
                <Text style={styles.restaurantName}>{item.nombre_restaurante}</Text>
                <Text style={styles.restaurantAddress}>{item.direccion}</Text>
              </View>
            )}
          />
        )}
  
        {/* Botón siempre visible */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={() =>
            router.push("/home/create-restaurant")
          }
        >
          <Text style={styles.createButtonText}>Crear Restaurante</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
  restaurantItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  restaurantAddress: {
    fontSize: 14,
    color: "#666",
  },
  createButton: {
    backgroundColor: "#e86a10",
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
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
});
