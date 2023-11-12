import React from "react";
import { SafeAreaView, Text, View, Image, ImageBackground, StyleSheet, TouchableOpacity, Button } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover", // or "stretch"
        justifyContent: "center",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 30,
    },
    bemvindo: {
        width: 300,
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: "#000",
    },
    buttonContainer: {
        marginVertical: 10,
        width: 200,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnCad: {
        backgroundColor: '#4CAF50', // Verde
    },
    btnList: {
        backgroundColor: '#3498db', // Azul
    },
    btnLogout: {
        backgroundColor: '#e74c3c', // Vermelho
    },
});

const Home = ({ navigation }: any) => {
    const sair = () => { navigation.navigate('Login') };
    const cadPet = () => { navigation.navigate('CadPets') };
    const listPet = () => { navigation.navigate('ListPet') };

    return (
        <ImageBackground source={require('../assets/selim.png')} style={styles.backgroundImage}>
            <SafeAreaView style={styles.container}>
                <Image source={require('../assets/GatimPain.png')} style={styles.bemvindo} />

                <TouchableOpacity
                    style={[styles.buttonContainer, styles.btnCad]}
                    onPress={cadPet}
                >
                    <MaterialCommunityIcons name="badge-account-horizontal-outline" size={24} color="#fff" />
                    <Text style={[styles.buttonText, { color: '#fff' }]}>Cadastrar Pets</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonContainer, styles.btnList]}
                    onPress={listPet}
                >
                    <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#fff" />
                    <Text style={[styles.buttonText, { color: '#fff' }]}>Lista de Pets</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonContainer, styles.btnLogout]}
                    onPress={sair}
                >
                    <MaterialCommunityIcons name="logout-variant" size={24} color="#fff" />
                    <Text style={[styles.buttonText, { color: '#fff' }]}>Sair</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
}

export default Home;
