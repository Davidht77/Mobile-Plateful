import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons";

export default () => {
    return(
        <Tabs
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              // Asignar íconos según el nombre de la pestaña
              if (route.name === "home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "restaurantes") {
                iconName = focused ? "restaurant" : "restaurant-outline";
              } else if (route.name === "settings") {
                iconName = focused ? "settings" : "settings-outline";
              }
  
              // Retorna el ícono correspondiente
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#e86a10", // Color del ícono activo
            tabBarInactiveTintColor: "gray", // Color del ícono inactivo
          })}
        >
            <Tabs.Screen name="home" options={{headerShown: false, tabBarLabel: "Home"}}/>
            <Tabs.Screen name="restaurantes" options={{headerTitle: "Restaurantes", tabBarLabel: "Restaurants"}}/>
            <Tabs.Screen name="settings" options={{headerTitle: "Settings", tabBarLabel: "Settings"}}/>
        </Tabs>
    );
};