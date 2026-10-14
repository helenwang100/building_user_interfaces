import BadgerNewsScreen from "./BadgerNewsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BadgerArticle from "./BadgerArticle"

const NewsStack = createNativeStackNavigator();

function BadgerNewsStack() {
    return <NewsStack.Navigator>
        <NewsStack.Screen name="all" component={BadgerNewsScreen} options={{headerShown: false}}/>
        <NewsStack.Screen name="article" component={BadgerArticle} options={{headerShown: false}}/>
    </NewsStack.Navigator>
}

export default BadgerNewsStack;
