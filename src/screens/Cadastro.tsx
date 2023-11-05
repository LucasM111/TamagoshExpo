import axios from '../axios.configs';
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
        margin: 50
    },
    textInput: {
        margin: 5,
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

const Cadastro = ({ navigation }: any) => {
    const [email, setEmail] = useState<string>();
    const [senha, setSenha] = useState<string>();
    const [confirmaSenha, setConfirmaSenha] = useState<string>();
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

    const Input = (value: string) => {
        setEmail(value);
    };
    const InputSenha = (value: string) => {
        setSenha(value);

    };

    const InputConfirmarSenha = (value: string) => {
        setConfirmaSenha(value);
    };




    return (
        <SafeAreaView style={style.container}>
            <View>
                <Image source={require('../assets/neon.jpg')} style={style.img} />
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

            <TextInput
                secureTextEntry={true}
                placeholder="Digite sua Confirmação de Senha"
                style={style.textInput}
                value={confirmaSenha}
                onChangeText={InputConfirmarSenha}
            />

            <TouchableOpacity
                style={style.btnCad}
            >
                <Button
                    onPress={submitar}
                    title="Cadastrar"
                />
            </TouchableOpacity>

            <TouchableOpacity style={style.btnCad}>
                <Button
                    onPress={voltar}
                    title="Voltar"
                />
            </TouchableOpacity>

        </SafeAreaView>
    );
}

export default Cadastro;