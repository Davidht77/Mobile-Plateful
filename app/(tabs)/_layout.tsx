import { Tabs } from "expo-router"

export default () => {
    return(
        <Tabs>
            <Tabs.Screen name="home" options={{headerShown: false, tabBarLabel: "Home"}}/>
            <Tabs.Screen name="restaurantes" options={{headerTitle: "Restaurantes", tabBarLabel: "Restaurants"}}/>
            <Tabs.Screen name="settings" options={{headerTitle: "Settings", tabBarLabel: "Settings"}}/>
        </Tabs>
    );
};