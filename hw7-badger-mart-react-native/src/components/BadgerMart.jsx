import { Button, Text, View, Alert } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";

import CS571 from '@cs571/mobile-client'
import { useEffect, useState } from "react";

export default function BadgerMart(props) {

    const [items, setItems] = useState([]);
    //const [numItems, setNumItems] = useState(0);
    const [pageOn, setPageOn] = useState(0);

    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw7/items", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(response => response.json())
            .then(data => {
                setItems(data);
                
                Alert.alert("hello")
                //console.log("hello");
                //setNumItems(data.length);
            });
    }, [])

    const prevPage = () => {
        setPageOn(p => p - 1);
    }

    const nextPage = () => {
        Alert.alert("hello")
        setPageOn(p => p + 1);
        console.log(pageOn);
    }

    return (

        <View>
            <Text style={{ fontSize: 28 }}>Welcome to Badger Mart!</Text>
            {console.log(items)}
            <View key={items[pageOn]}>
                <BadgerSaleItem
                    {...items[pageOn]}
                />
            </View>
            <Button
                title="Previous"
                onPress={prevPage}
                disabled={pageOn === 0}
            />
            <Button
                title="Next"
                onPress={() => nextPage}
                disabled={pageOn === items.length - 1}
                color="#d2691e"
            />

        </View>
    );
}