
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image} from 'react-native';
import { TextInput, Avatar, IconButton, Button } from 'react-native-paper';
import { useAuthContext } from '../../contexts/AuthContext'; 
import { router } from 'expo-router';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import ImagePicker from '../../components/ImagePicker';

const Settings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const { logout } = useAuthContext(); // Asume que tienes un método de logout en tu contexto

  function imageHandler(imageUri) {
    setProfileImage(imageUri);
  }

  async function selectImageHandler() {
    let image = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!image.canceled) {
      setProfileImage(image.assets[0].uri);
      console.log(image.assets[0].uri);
    }
  }

  const handleSaveChanges = () => {
    Alert.alert('Cambios guardados', 'Tus datos han sido actualizados correctamente');
  };

  const handleLogout = () => {
    logout(); 
    router.push("/(auth)/logIn"); // Redirigir a la página de inicio de sesión
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Avatar.Image
          size={100}
          source={{ uri: profileImage }}
        />
        <IconButton
          icon="camera"
          size={30}
          onPress={selectImageHandler}
          style={styles.cameraButton}
        />
      </View>
      <ImagePicker onImageChange={imageHandler} />
      <TextInput
        label="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Celular"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSaveChanges} style={styles.button}>
        Guardar cambios
      </Button>

      <Button mode="text" onPress={handleLogout} style={styles.button}>
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
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cameraButton: {
    marginTop: -50,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default Settings;

