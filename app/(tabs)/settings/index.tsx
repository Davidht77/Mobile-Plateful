import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Stack } from 'expo-router';
import { useAuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { getOwnInformacion } from '../../../services/auth/getOwn';
import { UsuarioDto } from '../../../interfaces/auth/UsuarioDto';

const Settings = () => {
  const { logout } = useAuthContext();
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<UsuarioDto | null>(null);

  const handleLogout = () => {
    logout();
    router.push("/(auth)/logIn");
  };

  const fetchProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('profileImage');
      if (savedImage) {
        setProfileImage(savedImage);
      }
    } catch (error) {
      console.error('Error al cargar la foto de perfil:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await getOwnInformacion(); // Llama al endpoint para obtener los datos del usuario
      setUserData(response);
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  };

  useEffect(() => {
    fetchProfileImage();
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Tu perfil */}
      <Text style={styles.header}>Tu perfil</Text>
      
      {/* Imagen de perfil */}
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={150}
          source={profileImage ? { uri: profileImage } : require('../../../assets/images/ftppordefectopng.png')}
        />
        
        {userData && (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userData.nombre}</Text>
            <Text style={styles.userEmail}>{userData.correo}</Text>
          </View>
        )}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default Settings;
