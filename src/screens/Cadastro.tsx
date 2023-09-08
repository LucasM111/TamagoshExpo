import React from "react";
import { SafeAreaView, Text, View, Image, StyleSheet } from "react-native";

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#252126",
        alignItems: 'center',
        padding: 20
    },
})


const Cadastro = () => {
    return (
        <SafeAreaView style={style.container}>
            <Text> Ola </Text>
        </SafeAreaView>
    );
}

export default Cadastro;