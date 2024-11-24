
import { Redirect } from "expo-router";
import { View , Text} from "react-native";

const SettingsPage = () => {
    return(
        <View style={{flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
            <Text>You are in the Settings</Text>
        </View>
    );
};
export default SettingsPage;