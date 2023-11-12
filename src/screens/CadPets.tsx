import React, { useState } from "react";
import { Text, SafeAreaView, TextInput, View, StyleSheet, Alert, TouchableOpacity, ImageBackground, Image, ScrollView } from "react-native";
import axios from '../axios.configs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 30,
        margin: 10,
        borderRadius: 100,
    },
    textInput: {
        marginVertical: 10,
        width: '80%',
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
    },
    btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 'bold',
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
    btnList: {
        backgroundColor: '#4CAF50', // Verde
    },
    btnLogout: {
        backgroundColor: '#e74c3c',
    },
});

const CadPets = ({ navigation }: any) => {
    const [nome, setNome] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const voltar = () => { navigation.navigate('Home') };

    const cad = async () => {
        try {
            setLoading(true);

            const cadPet = {
                name: nome,
            };

            await axios.post('/pet', cadPet);

            navigation.navigate('Home');

            Alert.alert("Congratulations", "Cadastro Realizado com Sucesso");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const inputPet = (value: string) => {
        setNome(value);
    }

    return (

        <ImageBackground source={require('../assets/TexturaPreta.jpg')} style={styles.backgroundImage}>
            <ScrollView>
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flex: 1 }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={false}
                ></KeyboardAwareScrollView>

                <SafeAreaView style={styles.container}>
                    <Image source={require('../assets/CadastroFox.jpg')} style={styles.logo} />

                    <Text style={styles.text}>
                        Cadastrar o seu PET
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Digite o nome do seu PET"
                        value={nome}
                        onChangeText={inputPet}
                    />

                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.btnList]}
                        onPress={cad}
                    >
                        <MaterialCommunityIcons name="badge-account-horizontal-outline" size={24} color="#fff" />
                        <Text style={[styles.buttonText, { color: '#fff' }]}>Cadastrar PET</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.btnLogout]}
                        onPress={voltar}
                    >
                        <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
                        <Text style={[styles.buttonText, { color: '#fff' }]}>Voltar</Text>
                    </TouchableOpacity>
                </SafeAreaView>


            </ScrollView>
        </ImageBackground>
    );
}

export default CadPets;
