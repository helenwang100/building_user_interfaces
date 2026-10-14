import { Text, View, Image } from "react-native";

export default function BadgerSaleItem(props) {
    return <View>
        <Text>{props.name}</Text>
        <Image
            style={{
                width: 200,
                height: 200
            }}
            source={{
                uri: props.imgSrc
            }}
        />
        <Text>Price: {props.price}</Text>
        <Text>Max Amount: {props.upperLimit}</Text>
    </View>
}
