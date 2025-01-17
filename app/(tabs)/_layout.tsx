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
              } else if (route.name === "search_bar"){
                iconName = focused ? "search": "search-outline"
              }
  
              // Retorna el ícono correspondiente
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#e86a10", // Color del ícono activo
            tabBarInactiveTintColor: "gray", // Color del ícono inactivo
          })}
        >
            <Tabs.Screen name="home" options={{headerShown: false, tabBarLabel: "Home"}}/>
            <Tabs.Screen name="search_bar" options={{headerTitle: "Settings", tabBarLabel: "Search", headerShown: false}}/>
            <Tabs.Screen name="restaurantes" options={{tabBarLabel: "Restaurants"}}/>
            <Tabs.Screen name="settings" options={{headerTitle: "Settings", tabBarLabel: "Settings", headerShown: false}}/>
        </Tabs>
    );
};