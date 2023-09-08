import React from "react";
import { SafeAreaView, Text, View, Image, StyleSheet } from "react-native";

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#252126",
        alignItems: 'center',
        padding: 20
    },
    bemvindo: {
        width: 300,
        height: 200
    }
})

const Home = () => {
    return (
        <SafeAreaView style={style.container}>
            <View >
                <Image source={require('../assets/bemvindo.png')} style={style.bemvindo} />
            </View>
        </SafeAreaView>
    );
}

export default Home;