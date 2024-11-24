import DatePicker from '../../components/DateTimePicker';
import { StyleSheet, View, Text } from "react-native";

export default function HomePage() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Home Page!</Text>
        <DatePicker/>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
  })