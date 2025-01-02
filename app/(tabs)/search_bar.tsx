import React, { useState, useEffect } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { getRestauranteByTipo } from '../../services/busqueda/searchTipo';
import { getRestauranteByNombre } from '../../services/busqueda/searchNombre';

const Busqueda = () => {
  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const updateSearch = (text) => {
    setSearch(text);
    setPage(1); // Reset page on new search
    setRestaurants([]); // Clear current results
    setHasMore(true); // Allow further loading
  };

  const fetchRestaurants = async () => {
    if (loading || !hasMore || search.trim() === "") { setRestaurants([]);return;};
  
    setLoading(true);
  
    try {
      // Realizar ambos requests en paralelo
      const [responseByTipo, responseByNombre] = await Promise.all([
        getRestauranteByTipo(search, page),
        getRestauranteByNombre(search, page),
      ]);
  
      // Combinar los resultados y eliminar duplicados
      const combinedResults = [...responseByTipo, ...responseByNombre];
      const uniqueResults = Array.from(
        new Map(combinedResults.map((item) => [item.id, item])).values()
      );
  
      if (uniqueResults.length > 0) {
        setRestaurants((prev) => [...prev, ...uniqueResults]);
      } else {
        setHasMore(false); // Detener la carga si no hay más resultados
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [page, search]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator style={styles.loadingIndicator} size="large" color="#888" /> : null;
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Escribe acá..."
        onChangeText={updateSearch}
        value={search}
        lightTheme
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.inputContainer}
      />

      <FlatList
        data={restaurants}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.restaurantCard}>
            <Text style={styles.restaurantName}>{item.nombre_restaurante}</Text>
            <Text style={styles.restaurantDetails}>{item.ubicacion.direccionCompleta}</Text>
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  inputContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  restaurantCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  restaurantDetails: {
    fontSize: 14,
    color: '#666',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});

export default Busqueda;