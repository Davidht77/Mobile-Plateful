import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, List } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuthContext } from '../../../contexts/AuthContext';

const Settings = () => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    router.push("/(auth)/logIn");
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Item
          title="Cambiar Nombre y Celular"
          description="Actualizar tu nombre y celular"
          left={(props) => <List.Icon {...props} icon="account" />}
          onPress={() => router.push("/settings/change-name-phone")}
        />
        <List.Item
          title="Cambiar Foto de Perfil"
          description="Actualizar tu foto de perfil"
          left={(props) => <List.Icon {...props} icon="camera" />}
          onPress={() => router.push("/settings/change-photo")}
        />
      </List.Section>
      <Button mode="outlined" onPress={handleLogout} style={styles.logoutButton}>
        Cerrar sesión
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default Settings;
