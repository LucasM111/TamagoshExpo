import axios from '../axios.configs';
import React, { useCallback, useState, useEffect } from "react";
import { SafeAreaView, TextInput, View, Image, StyleSheet, Alert, TouchableOpacity, Button } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
        width: 150,
        height: 40,
        backgroundColor: '#0dff00',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    btnCadVoltar: {
        width: 150,
        height: 40,
        backgroundColor: '#ff0000',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="login" size={24} color="#000" />
                    <Button
                        onPress={submitar}
                        title="Cadastrar"
                        color="#000"
                    />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={style.btnCadVoltar}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
                    <Button
                        onPress={voltar}
                        title="Voltar"
                        color="#fff"
                    />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Cadastro;