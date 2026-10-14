import { useState, useEffect, useRef, useCallback } from "react";
import CS571 from '@cs571/mobile-client';
import { View, Text, Image, ScrollView, StyleSheet, Animated, Pressable, Button, Linking } from "react-native";

export default function BadgerArticle(props) {

    const [article, setArticle] = useState();
    const fadeRef = useRef(new Animated.Value(0));

    const styles = StyleSheet.create({
        card: {
            padding: 16,
            elevation: 5,
            borderRadius: 10,
            backgroundColor: "beige",
            marginBottom: 16
        }
    })

    useEffect(() => {
        Animated.timing(fadeRef.current, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start()
    }, [article])

    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw8/article?id=" + props.route.params, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(response => response.json())
            .then(data => {
                setArticle(data);
                //alert(data.title)
            });
    }, [props.route.params]);

    const OpenURLButton = ({url, children}) => {
        const handlePress = useCallback(async () => {
          const supported = await Linking.canOpenURL(url);
          if (supported) {
            await Linking.openURL(url);
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }, [url]);
      
        return <Button title={children} onPress={handlePress} />;
      };
    
    useEffect(() => {
        Animated.timing(fadeRef.current, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true
        }).start();
    }, [])

    if (!article) {  // idea of if and else from ChatGPT
        return <Text>Loading...</Text>;
    } else {
        url = article.url;
        return <Animated.View style={{ opacity: fadeRef.current }}>
            <ScrollView key={article.id} style={[styles.card, article.style]}>
                <Text style={{ fontSize: 32 }}>{article.title}</Text>
                <Text>{article.author}</Text>
                <Text>{article.posted}</Text>
                  <OpenURLButton url={article.url}>Read the full article here</OpenURLButton>
                <Image
                    style={{
                        width: 200,
                        height: 200,
                        marginBottom: 8
                    }}
                    source={{
                        uri: "https://raw.githubusercontent.com/CS571-S24/hw8-api-static-content/main/" + article.img
                    }}
                />
                <Text>{article.body}</Text>
            </ScrollView>
        </Animated.View>
    }

}