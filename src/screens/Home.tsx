import React from "react";
import { SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity, Button } from "react-native";

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
    },
    btnCad: {
        margin: 10,
        width: 150,
        height: 40,
        backgroundColor: '#b7ff00',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: "#fff"
    }
})

const Home = ({ navigation }: any) => {


    const sair = () => { navigation.navigate('Login') };
    const cadPet = () => { navigation.navigate('CadPets') };
    const listPet = () => { navigation.navigate('ListPet') };

    return (
        <SafeAreaView style={style.container}>
            <View >
                <Image source={require('../assets/bemvindo.png')} style={style.bemvindo} />

            </View>

            <TouchableOpacity style={style.btnCad}>
                <Button
                    onPress={cadPet}
                    title="Cadastrar Pets"
                />
            </TouchableOpacity>

            <TouchableOpacity style={style.btnCad}>
                <Button
                    onPress={listPet}
                    title="Lista de Pets"
                />
            </TouchableOpacity>

            <TouchableOpacity style={style.btnCad}>
                <Button
                    onPress={sair}
                    title="Sair"
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Home;