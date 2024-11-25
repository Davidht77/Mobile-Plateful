import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from "expo-location";
import { getUbication } from '../../services/maps/getUbication';
import { getUbicationNearby } from '../../services/maps/getRestaurantsNearby';
import { useStorageState } from '../../hooks/useStorageState';

const RestaurantsPage = () => {
    const [location, setLocation] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
  
    useEffect(() => {
      loadRestaurants();
    }, [page]);
  
    const loadRestaurants = async () => {
      if (loading || !hasMore) return; // Si ya estamos cargando o no hay más restaurantes, no hacer nada
      setLoading(true);
      try {

        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        });
        const data = await getUbicationNearby(location);
        
        if (data.length === 0) {
          setHasMore(false);  // Si no hay más datos, deshabilitamos el infinite scroll
        } else {
          setRestaurants((prevRestaurants) => [...prevRestaurants, ...data]);
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleEndReached = () => {
      if (!loading && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.restaurant}>
              <Text>{item.name}</Text>
              <Text>{item.address}</Text>
            </View>
          )}
          onEndReached={handleEndReached}  // Disparar cuando llegamos al final
          onEndReachedThreshold={0.5}  // Umbral para que se active cuando esté cerca del final
          ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null} // Indicador de carga al final
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
      backgroundColor: '#f9f9f9',
    },
  });
  
  export default RestaurantsPage;
