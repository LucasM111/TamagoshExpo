import { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import Home from "./Home";
import App from "../../App";

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#252126",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
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


    }
})



const Login = ({ navigation }: any) => {

    const [login, setLogin] = useState<string>();
    const [senha, setSenha] = useState<string>();
    const [hasError, setHasError] = useState(false);

    const navegar = () => {
        navigation.navigate('Home', { id: 1 });
    }

    // Setando o Login
    const onChangeInput = (value: string) => {
        if (value.length <= 0) {
            setHasError(true)
        } else {
            setHasError(false)
        }
        setLogin(value)

    };

    // Setando a senha
    const onChangeInputSenha = (value: string) => {
        if (value.length <= 0) {
            setHasError(true)
        } else {
            setHasError(false)
        }
        setSenha(value)
    };

    return (
        <SafeAreaView style={style.container}>

            <TextInput placeholder="Digite seu Login" style={style.textInput} value={login} onChangeText={onChangeInput} />
            {hasError ?? null}

            <TextInput secureTextEntry={true} placeholder="Digite sua Senha" style={style.textInput} value={senha} onChangeText={onChangeInputSenha} />

            <TouchableOpacity style={style.btnLogar}>
                <Button onPress={navegar} title="Logar" />
            </TouchableOpacity>

        </SafeAreaView>
    );
}

export default Login;