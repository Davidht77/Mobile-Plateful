import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import { router, Stack } from 'expo-router';
import { useAuthContext } from '../../../contexts/AuthContext';

const Settings = () => {
  const { logout } = useAuthContext();
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);

  const handleLogout = () => {
    logout();
    router.push("/(auth)/logIn");
  };

  const fetchProfileImage = async () => {
    try {
      // Recuperar la URI desde AsyncStorage
      const savedImage = await AsyncStorage.getItem('profileImage');
      if (savedImage) {
        setProfileImage(savedImage);
      }
    } catch (error) {
      console.error('Error al cargar la foto de perfil:', error);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={150}
          source={profileImage ? { uri: profileImage } : require('../../../assets/images/ftppordefectopng.png')}
        />
      </View>
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default Settings;
