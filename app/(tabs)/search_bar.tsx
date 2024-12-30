import React, { useState, useEffect } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { getRestauranteByTipo } from '../../services/busqueda/searchTipo';

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
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await getRestauranteByTipo( search, page);

      if (response.length > 0) {
        setRestaurants((prev) => [...prev, ...response]);
      } else {
        setHasMore(false); // No more data
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