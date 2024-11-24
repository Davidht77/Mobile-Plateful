import { Link } from "expo-router";
import { View , Text} from "react-native";

const ListPage = () => {
    return (
        <View style={{flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
            <Link href="/list/1">ONE</Link>
            <Link href="/list/2">TWO</Link>
            <Link href="/list/3">THREE</Link>
        </View>
    );
}
export default ListPage;