import axios from '../axios.configs';
import React, { useState } from "react";
import { SafeAreaView, TextInput, View, Image, StyleSheet, Alert, TouchableOpacity, Text, ImageBackground, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 30,
        margin: 10,
        borderRadius: 100,
    },
    input: {
        marginVertical: 10,
        width: 300,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingLeft: 10,
        alignSelf: 'center',
        opacity: 0.8,
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
    btnCadastro: {
        backgroundColor: '#4CAF50',
    },
    btnLogout: {
        backgroundColor: '#e74c3c',
    },
    TextCadastro: {
        fontSize: 40,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        opacity: 0.8,
    }
});

const Cadastro = ({ navigation }: any) => {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [confirmaSenha, setConfirmaSenha] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const voltar = () => { navigation.navigate('Login') };

    const submitar = async () => {
        try {
            setLoading(true)

            if (senha !== confirmaSenha) {
                Alert.alert("Ops", "As senhas devem ser iguais");
                setLoading(false);
                return;
            }

            const enter = {
                email: email,
                password: senha,
            };

            await axios.post('/register', enter);
            Alert.alert("Congratulations", "Cadastro Realizado com Sucesso")
            navigation.navigate('Login');
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
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
                    <Image source={require('../assets/Hinatinha.jpg')} style={styles.logo} />
                    <Text style={styles.TextCadastro}>Realize Seu Cadastro</Text>

                    <TextInput
                        placeholder="Digite seu Login"
                        style={styles.input}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />

                    <TextInput
                        secureTextEntry={true}
                        placeholder="Digite sua Senha"
                        style={styles.input}
                        value={senha}
                        onChangeText={(value) => setSenha(value)}
                    />

                    <TextInput
                        secureTextEntry={true}
                        placeholder="Digite sua Confirmação de Senha"
                        style={styles.input}
                        value={confirmaSenha}
                        onChangeText={(value) => setConfirmaSenha(value)}
                    />

                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.btnCadastro]}
                        onPress={submitar}
                    >
                        <MaterialCommunityIcons name="login" size={24} color="#fff" />
                        <Text style={[styles.buttonText, { color: '#fff' }]}>Cadastrar</Text>
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

export default Cadastro;
