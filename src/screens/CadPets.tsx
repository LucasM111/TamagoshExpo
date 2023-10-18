import React, { useState } from "react";
import { Text, SafeAreaView, TextInput, View, Image, StyleSheet, Alert, TouchableOpacity, Button } from "react-native";
import axios from '../axios.configs';


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#252126",
        alignItems: 'center',
        padding: 20
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
    text: {
        fontSize: 20,
        color: '#fff',
        margin: 15,
    },
    btnCad: {
        margin: 10,
        width: 150,
        height: 40,
        backgroundColor: '#b7ff00',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: "#fff"
    }
})

const CadPets = ({ navigation }: any) => {
    const [nome, setNome] = useState<string>();
    const [loading, setLoading] = useState(false);

    const cad = async () => {
        try {
            setLoading(true)

            const cadPet = {
                name: nome,

            };
            await axios.post('/pet', cadPet);

            navigation.navigate('Home');

            Alert.alert("Congratulations", "Cadastro Realizado com Sucesso")

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const inputPet = (value: string) => {
        setNome(value);
    }




    return (
        <SafeAreaView style={style.container}>
            <Text style={style.text}>
                Cadastrar o seu PET
            </Text>
            <TextInput style={style.textInput}
                placeholder="Digite o nome do seu PET"
                value={nome}
                onChangeText={inputPet} />
            <TouchableOpacity style={style.btnCad}>
                <Button
                    onPress={cad}
                    title="Cadastrar"
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default CadPets;