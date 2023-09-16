import { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity, Image, View, Alert } from "react-native";

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

    const [login, setLogin] = useState<string>();
    const [senha, setSenha] = useState<string>();
    const [hasError, setHasError] = useState(true);

    const navegar = () => {
        if (hasError) {
            return Alert.alert("Atenção", "Valores invalidos em senha/login")
        }
        navigation.navigate('Home');
    }

    const cadastrar = () => {
        navigation.navigate('Cadastro');
    }


    // Setando o Login
    const onChangeInput = (value: string) => {
        // console.log(value, "=======")
        if (value.length < 1 || value.length > 8) {
            setHasError(true)
            return Alert.alert("Atenção", "Valores invalidos em senha/login")
        }
        setHasError(false)
        setLogin(value)

    };

    // Setando a senha
    const onChangeInputSenha = (value: string) => {
        if (value.length < 6 || value.length > 8) {
            setHasError(true)
            return Alert.alert("Atenção", "Valores invalidos em senha/login")
        }
        setHasError(false)
        setSenha(value)
    };



    return (
        <SafeAreaView style={style.container}>
            <View>
                <Image source={require('../assets/logo.png')} style={style.logo} />
            </View>

            <TextInput
                placeholder="Digite seu Login"
                style={style.textInput}
                value={login}
                onChangeText={onChangeInput}
            />


            <TextInput
                secureTextEntry={true}
                placeholder="Digite sua Senha"
                style={style.textInput}
                value={senha}
                onChangeText={onChangeInputSenha}
            />

            <TouchableOpacity
                style={style.btnLogar}
            >
                <Button
                    onPress={navegar}
                    title="Logar"
                />
            </TouchableOpacity>


            <TouchableOpacity
                style={style.btnCad}
            >
                <Button
                    onPress={cadastrar}
                    title="Cadastrar"
                />
            </TouchableOpacity>

        </SafeAreaView>
    );
}

export default Login;