import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import React, { useEffect, useState } from "react";
import OutlinedButton from "./OutlineBottom";

function ImagePicker({ onImageChange }) {
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
  if (cameraPermissionInformation?.status === PermissionStatus.GRANTED) {
        return true; // Permiso ya concedido
      }
  
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    };

  async function selectImageHandler() {
    let image = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!image.canceled) {
      setPickedImage(image.assets[0].uri);
      console.log(image.assets[0].uri);
    }
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.canceled) {
      console.log(image.assets[0].uri);
      setPickedImage(image.assets[0].uri);
    }
  }

  let imagePreview = <Text style={styles.imageText}>No image</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  useEffect(() => {
    onImageChange(pickedImage);
  }, [pickedImage]);

  return (
    <View>
      <View style={styles.actions}>
        <OutlinedButton icon="images" onPress={selectImageHandler}>
          Select
        </OutlinedButton>
        <OutlinedButton icon="camera" onPress={takeImageHandler}>
          Take
        </OutlinedButton>
      </View>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageText: {
    color: "#fff",
  },
  image: {
    width: 300,
    height: 300,
  },
});