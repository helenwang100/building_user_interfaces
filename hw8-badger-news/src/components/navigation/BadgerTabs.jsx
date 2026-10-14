import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BadgerNewsStack from "../screens/BadgerNewsStack";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
//import BadgerNewsScreen from "../screens/BadgerNewsScreen";

function BadgerTabs(props) {
    const Tabs = createBottomTabNavigator();

    return <>
        <Tabs.Navigator>
            <Tabs.Screen name="News" component={BadgerNewsStack} />
            <Tabs.Screen name="Preferences" component={BadgerPreferencesScreen} />
        </Tabs.Navigator>
    </>
}
export default BadgerTabs;