import axios from '../axios.configs';
import { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity, Image, View, Alert } from "react-native";
import user from '../store/user';

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: 'center',
        padding: 20,
    },
    textInput: {
        width: 300,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 10
    },
    btnLogar: {
        width: 100,
        height: 40,
        backgroundColor: '#b7ff00',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: "#fff"
    },
    btnCad: {
        margin: 10,
        width: 100,
        height: 40,
        backgroundColor: '#b7ff00',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: "#fff"
    },
    logo: {
        height: 200
    }
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
        <SafeAreaView style={style.container}>
            <View>
                <Image source={require('../assets/logo.png')} style={style.logo} />
            </View>

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
                style={style.btnLogar}
            >
                <Button
                    onPress={submitar}
                    title="Logar"
                />
            </TouchableOpacity>


            <TouchableOpacity
                style={style.btnCad}
            >
                <Button
                    onPress={navegar}
                    title="Cadastrar"
                />
            </TouchableOpacity>

        </SafeAreaView>
    );
}

export default Login;