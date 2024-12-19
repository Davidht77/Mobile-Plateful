import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from "expo-location";
import { getUbication } from '../../services/maps/getUbication';
import { getUbicationNearby } from '../../services/maps/getRestaurantsNearby';
import { useStorageState } from '../../hooks/useStorageState';
import { ubicationResquest } from '../../interfaces/ubication/UbicationRequest';
import { RestauranteResponse } from '../../interfaces/restaurantes/RestauranteResponse';
import { Link, Redirect } from 'expo-router';

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
  }, []);

  const paginateRestaurants = () => {
    const startIndex = (currentPage - 1) * restaurantsPerPage;
    const endIndex = startIndex + restaurantsPerPage;
    return restaurants.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    if ((currentPage * restaurantsPerPage) < restaurants.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={paginateRestaurants()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.restaurant} className='bg-orange-400'>
            <Link href={`/resturante/${item.id}`}>{item.nombre_restaurante}</Link>
            <Text>{item.ubicacion.direccionCompleta}</Text>
          </View>
        )}
      />
      <View style={styles.pagination}>
        <Button
          title="Anterior"
          onPress={handlePrevPage}
          disabled={currentPage === 1}
        />
        <Text>Página {currentPage}</Text>
        <Button
          title="Siguiente"
          onPress={handleNextPage}
          disabled={(currentPage * restaurantsPerPage) >= restaurants.length}
        />
      </View>
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
