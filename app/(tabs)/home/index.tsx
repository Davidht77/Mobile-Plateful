import { Link, router } from "expo-router";
import { View , Text} from "react-native";

const HomePage = () => {
    return (
        <View style={{flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
            <Link href="settings">Go to Settings</Link>
        </View>
    );
}
export default HomePage;