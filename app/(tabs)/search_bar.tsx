import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

type SearchBarComponentProps = {};

const Busqueda: React.FunctionComponent<SearchBarComponentProps> = () => {
const [search, setSearch] = useState("");

const updateSearch = (search) => {
  setSearch(search);
};

return (
  <View className='m-2.5'>
    <SearchBar
      placeholder="Escribe aca..."
      onChangeText={updateSearch}
      value={search}
    />
  </View>
);
};

export default Busqueda;