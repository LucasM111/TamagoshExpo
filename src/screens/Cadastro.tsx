import React from "react";
import { SafeAreaView, Text, View, Image, StyleSheet } from "react-native";

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: 'center',
        padding: 20,
    },
    img: {
        width: 400,
        height: 100,
        justifyContent: 'center',
    }
})


const Cadastro = () => {
    return (
        <SafeAreaView style={style.container}>
            <View >
                <Image source={require('../assets/neon.jpg')} style={style.img} />
            </View>
        </SafeAreaView>
    );
}

export default Cadastro;