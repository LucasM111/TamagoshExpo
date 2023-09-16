import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { SafeAreaView, TextInput, View, Image, StyleSheet, Alert, TouchableOpacity, Button } from "react-native";

// Rota: https://tamagochiapi-clpsampedro.b4a.run

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
    },
    textInput: {
        width: 300,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 10
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
    }
})


const Cadastro = () => {
    const [cadastro, setCadastro] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [senha, setSenha] = useState<string>();
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(true);

    const postCadastro = useCallback(async () => {
        try {
            setLoading(true);

            const { data } = await axios.get("https://tamagochiapi-clpsampedro.b4a.run");

            setEmail(
                data.map((email: any) => ({
                    email: email.email,
                }))
            )

            setSenha(
                data.map((senha: any) => ({
                    senha: senha.password
                }))
            )

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        postCadastro();
    }, [])


    //setar o email
    const inputEmail = (value: string) => {
        if (value.length < 0) {
            setHasError(true)
            return Alert.alert("Atenção", "Insira um e-mail valido")
        }
        setHasError(false);
        setEmail(value);
    }

    //setar a senha
    const inputSenha = (value: string) => {
        setSenha(value);
    }

    return (
        <SafeAreaView style={style.container}>
            <View >
                <Image source={require('../assets/neon.jpg')} style={style.img} />
            </View>

            <TextInput
                placeholder="Digite seu Login"
                style={style.textInput}
                value={email}
                onChangeText={inputEmail}
            />


            <TextInput
                secureTextEntry={true}
                placeholder="Digite sua Senha"
                style={style.textInput}
                value={senha}
                onChangeText={inputSenha}
            />

            <TouchableOpacity
                style={style.btnCad}
            >



            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Cadastro;