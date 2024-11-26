import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Avatar, IconButton, Button } from 'react-native-paper';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from 'expo-image-picker';
import { router } from 'expo-router';

const ChangePhoto = () => {
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const verifyCameraPermissions = async () => {
    if (cameraPermission?.status === PermissionStatus.GRANTED) {
      return true;
    }

    const permissionResponse = await requestCameraPermission();
    return permissionResponse.granted;
  };

  const takePhotoHandler = async () => {
    const hasPermission = await verifyCameraPermissions();
    if (!hasPermission) {
      Alert.alert('Permiso denegado', 'Por favor concede permisos para usar la cámara.');
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!image.canceled) {
      setProfileImage(image.assets[0].uri);
    }
  };

  const selectImageHandler = async () => {
    const image = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!image.canceled) {
      setProfileImage(image.assets[0].uri);
    }
  };

  const handleSavePhoto = () => {
    Alert.alert('Foto Actualizada', 'Tu foto de perfil ha sido actualizada.');
    router.push("/settings");
  };

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={150}
        source={profileImage ? { uri: profileImage } : require('../../../assets/images/ftppordefectopng.png')}
      />
      <View style={styles.buttonsContainer}>
        <IconButton icon="camera" size={30} onPress={takePhotoHandler} />
        <IconButton icon="image" size={30} onPress={selectImageHandler} />
      </View>
      <Button mode="contained" onPress={handleSavePhoto} style={styles.button}>
        Guardar Foto
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default ChangePhoto;