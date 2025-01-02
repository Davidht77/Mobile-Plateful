import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from "expo-location";
import { getUbication } from '../../services/maps/getUbication';
import { getUbicationNearby } from '../../services/maps/getRestaurantsNearby';
import { ubicationResquest } from '../../interfaces/ubication/UbicationRequest';
import { RestauranteResponse } from '../../interfaces/restaurantes/RestauranteResponse';
import { Link, Redirect, Stack } from 'expo-router';
import { getOwnRole } from '../../services/auth/getOwn';


const RestaurantsPage = () => {
  const [location, setLocation] = useState<ubicationResquest>(null);
  const [restaurants, setRestaurants] = useState<RestauranteResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(10);  // Número de restaurantes por página

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation({
        latitud: userLocation.coords.latitude,
        longitud: userLocation.coords.longitude,
        });
        const data = await getUbicationNearby(location);
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();

    console.log("Restaurantes Obtenidos");
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerTitle: "Restaurantes Cercanos"}}/>       
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.restaurant} className='bg-orange-400 shadow-sm rounded-lg p-4 mb-3 mx-4 border border-gray-200'>
            <Link href={`/restaurante/${item.id}`} className='text-lg font-bold text-black'>{item.nombre_restaurante}</Link>
            <Text className="text-lg">Tipo: {item.tipoRestaurante}</Text>
            <Text>{item.ubicacion.direccionCompleta}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  restaurant: {
    marginBottom: 10,
    padding: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default RestaurantsPage;
