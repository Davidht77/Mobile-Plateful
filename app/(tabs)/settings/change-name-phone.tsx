import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { router, Stack } from 'expo-router';
import { getOwnInformacion } from '../../../services/auth/getOwn';

const ChangeNamePhone = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const ObtenerUsuario = async () => {
    return await getOwnInformacion();
  };

  const handleSaveChanges = async () => {
    console.log(await ObtenerUsuario());
    Alert.alert('Cambios guardados', 'Tu nombre y contraseña han sido actualizados correctamente');
    router.push("/settings"); // Regresa a la pantalla de configuración
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nuevo Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Nuevo Celular"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSaveChanges} style={styles.button}>
        Guardar Cambios
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default ChangeNamePhone;

