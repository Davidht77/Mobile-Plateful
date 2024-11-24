import { Tabs } from "expo-router"

export default () => {
    return(
        <Tabs>
            <Tabs.Screen name="home" options={{headerShown: false}}/>
            <Tabs.Screen name="list"/>
            <Tabs.Screen name="settings" options={{headerTitle: "Settings"}}/>
        </Tabs>
    );
};