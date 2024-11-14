import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch, TextInput } from 'react-native-paper';

export default function App() {
  const [switchOn, setSwitchOn] = useState(false);
  const changeSwitch = () =>{setSwitchOn(!switchOn)};

  return (
    <NavigationContainer>
    <View style={styles.container}>
      <Text>Bienvenido a la aplicacion de Plateful</Text>
      <TextInput label="Nombre"/>
      <TextInput label="Correo"/>
      <TextInput secureTextEntry label="Contraseña"/>
      <TextInput label="Fecha Nacimiento"/>
      <View style={{flexDirection:"row", alignItems: "center"}}>
        <Text>Propietario</Text>
        <Switch value={switchOn} onChange={changeSwitch}/>
      </View>
      <StatusBar style='auto'/>
    </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4764c',
    justifyContent: 'center',
  },
});
