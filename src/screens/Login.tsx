import axios from '../axios.configs';
import { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity, Image, View, Alert, ImageBackground, Text, ScrollView } from "react-native";
import user from '../store/user';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const style = StyleSheet.create({
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
    TextLogin: {
        fontSize: 40,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        opacity: 0.8,
    },
    textInput: {
        width: 300,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 10
    },
    logo: {
        width: 300,
        height: 320,
        margin: 10,
        marginBottom: 10,
        borderRadius: 70,
    },
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
})



const Login = ({ navigation }: any) => {

    const [email, setEmail] = useState<string>();
    const [senha, setSenha] = useState<string>();
    const navegar = () => { navigation.navigate('Cadastro') };

    const userStore = user();

    const submitar = async () => {
        try {
            const enter = {
                email: email,
                password: senha,
            };
            const req = await axios.post('/login', enter);
            userStore.setToken(req.data.token);

            navigation.navigate('Home');

        } catch (error) {
            console.error(error)
            Alert.alert("Erro", "Email ou Senha invalida")
        }
    }

    const Input = (value: string) => {
        setEmail(value);
    };
    const InputSenha = (value: string) => {
        setSenha(value);
    };

    return (
        <ImageBackground source={require('../assets/TexturaPreta.jpg')} style={style.backgroundImage}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
            >
                <ScrollView>
                    <SafeAreaView style={style.container}>
                        <View>
                            <Image source={require('../assets/SejaBemVindo.gif')} style={style.logo} />
                        </View>
                        <Text style={style.TextLogin}>Login</Text>
                        <TextInput
                            placeholder="Digite seu Login"
                            style={style.textInput}
                            value={email}
                            onChangeText={Input}
                        />


                        <TextInput
                            secureTextEntry={true}
                            placeholder="Digite sua Senha"
                            style={style.textInput}
                            value={senha}
                            onChangeText={InputSenha}
                        />

                        <TouchableOpacity
                            style={[style.buttonContainer, style.btnCad]}
                            onPress={submitar}
                        >
                            <MaterialCommunityIcons name="login" size={24} color="#fff" />
                            <Text style={[style.buttonText, { color: '#fff' }]}>Logar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[style.buttonContainer, style.btnList]}
                            onPress={navegar}
                        >
                            <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#fff" />
                            <Text style={[style.buttonText, { color: '#fff' }]}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </ScrollView>
            </KeyboardAwareScrollView>
        </ImageBackground >
    );
}

export default Login;