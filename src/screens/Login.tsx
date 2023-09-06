import { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import Home from "./Home";

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
        backgroundColor: '#9e09de',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',

    }
})

const btnCad = () => {
    <Home />
}


const Login = () => {

    const [login, setLogin] = useState<string>();
    const [senha, setSenha] = useState<string>();
    const [hasError, setHasError] = useState(false);

    const onChangeInput = (value: string) => {
        if (value.length <= 0) {
            setHasError(true)
        } else {
            setHasError(false)
        }
        setLogin(value)
        setSenha(value)
    };

    return (
        <SafeAreaView style={style.container}>

            <TextInput placeholder="Digite seu Login" style={style.textInput} value={login} onChangeText={onChangeInput} />
            {hasError ?? null}

            <TextInput secureTextEntry={true} placeholder="Digite sua Senha" style={style.textInput} value={senha} onChangeText={onChangeInput} />

            <TouchableOpacity style={style.btnLogar} onPress={btnCad}>
                <Text>Logar</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

export default Login;