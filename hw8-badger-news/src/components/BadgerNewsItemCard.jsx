import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

export default function BadgerNewsItemCard(props) {
    
    const navigation = useNavigation();
    const styles = StyleSheet.create({
        card: {
            padding: 16,
            elevation: 5,
            borderRadius: 10,
            backgroundColor: "beige",
            marginBottom: 16
        }
    })

    function handlePress() {
        navigation.push("article", props.fullArticleId);
    }

    return <>
        <Pressable onPress={handlePress}>
            <View style={[styles.card, props.style]}>
                <Image
                    style={{
                        width: 200,
                        height: 200,
                        marginBottom: 8
                    }}
                    source={{
                        uri: "https://raw.githubusercontent.com/CS571-S24/hw8-api-static-content/main/" + props.img
                    }}
                />
                <Text>{props.title}</Text>
            </View>
        </Pressable>
    </>
}