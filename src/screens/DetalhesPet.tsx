import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity, Button, ActivityIndicator, Alert } from "react-native";
import axios from "../axios.configs";
import JogoParOuImpar from "./JogoParouImpar";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5", // Cor de fundo clara
        padding: 20,
    },
    card: {
        backgroundColor: "#FFFFFF", // Cor de fundo do card
        borderRadius: 15,
        padding: 20,
        margin: 20,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    petDetails: {
        fontSize: 16,
        color: "#333333", // Cor do texto mais escura
        marginVertical: 5,
    },
    petDetailsNome: {
        fontSize: 28,
        color: "#333333", // Cor do texto mais escura
        marginVertical: 10,
        fontWeight: "bold",
    },
    image: {
        width: 150,
        height: 150,
        marginVertical: 10,
    },
    btn: {
        marginVertical: 10,
        width: 200,
        height: 40,
        backgroundColor: "#b7ff00",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    petDetailsStats: {
        fontSize: 16,
        color: "#333333",
        marginVertical: 5,
    },
    petDetailsNivel: {
        fontSize: 20,
        color: "#333333",
        marginVertical: 10,
        fontWeight: "bold",
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
    btnAlimentar: {
        backgroundColor: '#49a8ad', // Verde
    },
    btnDormir: {
        backgroundColor: '#90449c', // Azul
    },
    btnBrincar: {
        backgroundColor: '#34914c', // Vermelho
    },
    btnLogout: {
        backgroundColor: '#e74c3c',
        alignSelf: 'center'
    },

});

const getPetDetails = async (id) => {
    try {
        const response = await axios.get(`/pet/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar detalhes do pet", error);
        return null;
    }
};

const DetalhesPet = ({ route, navigation }: any) => {
    const { id, imagem } = route.params;
    const [petDetails, setPetDetails] = useState(null);
    const [jogoAberto, setJogoAberto] = useState(false);

    const voltar = () => { navigation.navigate('ListPet') };

    const handleGameEnd = () => {
        setJogoAberto(false);
        brincarComPet();
    };

    const alimentarPet = async () => {
        try {
            const DescansoAntes = Math.floor(Math.round(petDetails?.life));
            const fomeAntes = Math.floor(Math.round(petDetails?.foodLevel));

            await axios.post(`/pet/${id}/food`);
            console.log("Pet alimentado com sucesso!");

            if (petDetails) {
                const novoNivelVida = petDetails.life + 1;
                const novoNivelFome = Math.floor(Math.round(petDetails.foodLevel - 5));

                setPetDetails({
                    ...petDetails,
                    life: novoNivelVida,
                    foodLevel: novoNivelFome,
                });

                const vidaDepois = Math.floor(Math.round(novoNivelVida));
                const fomeDepois = Math.floor(Math.round(novoNivelFome));

                Alert.alert(
                    "Agora o Pet Está de Pancinha Cheia",
                    `Nível de vida: ${DescansoAntes} > ${vidaDepois}\nNível de fome: ${fomeAntes} > ${fomeDepois}`
                );
            }
        } catch (error) {
            console.error("Erro ao alimentar o pet", error);
            Alert.alert("Houve um erro ao tentar alimentar o pet");
        }
    };

    const aumentarDescansoPet = async () => {
        try {
            const vidaAntes = Math.floor(Math.round(petDetails?.life));

            await axios.post(`/pet/${id}/rest`);
            console.log("Descanso do pet aumentado com sucesso!");

            if (petDetails) {
                const novaVida = petDetails.life + 1;

                setPetDetails({
                    ...petDetails,
                    life: novaVida,
                });

                const vidaDepois = Math.floor(Math.round(novaVida));

                Alert.alert(
                    "Pet Dormiu e Descansou",
                    `Nível de vida: ${vidaAntes} > ${vidaDepois}`
                );
            }
        } catch (error) {
            console.error("Erro ao aumentar o descanso do pet", error);
            Alert.alert(
                "Houve um erro ao tentar aumentar o descanso do pet"
            );
        }
    };

    const brincarComPet = async () => {
        try {
            const DiversaoAntes = Math.floor(Math.round(petDetails?.funLevel));

            await axios.post(`/pet/${id}/play`);
            console.log("Pet se divertiu");

            if (petDetails) {
                const Novadiversao = petDetails.funLevel + 1;

                setPetDetails({
                    ...petDetails,
                    funLevel: Novadiversao,
                });

                const DiversaoDepois = Math.floor(Math.round(Novadiversao));

                Alert.alert(
                    "O Pet Ficou Eufórico Com o Jogo",
                    `Nível de Diversão: ${DiversaoAntes} > ${DiversaoDepois}`
                );
            }
        } catch (error) {
            console.error("Erro ao aumentar o descanso do pet", error);
            Alert.alert(
                "Houve um erro ao tentar aumentar o descanso do pet"
            );
        }
    };

    useEffect(() => {
        const { id } = route.params;
        const fetchPetDetails = async () => {
            const details = await getPetDetails(id);
            setPetDetails(details);
        };
        fetchPetDetails();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {jogoAberto ? (
                <JogoParOuImpar onGameEnd={handleGameEnd} />
            ) : petDetails ? (
                <View style={styles.card}>
                    <Image source={imagem} style={styles.image} />
                    <Text style={styles.petDetailsNome}>{petDetails.name}</Text>
                    <Text style={styles.petDetailsNivel}>
                        Level: {Math.round(petDetails.restLevel)}
                    </Text>
                    <Text style={styles.petDetailsStats}>
                        Vida: {Math.round(petDetails.life)}
                    </Text>
                    <Text style={styles.petDetailsStats}>
                        Diversão: {Math.round(petDetails.funLevel)}
                    </Text>
                    <Text style={styles.petDetailsStats}>
                        Fome: {Math.round(petDetails.foodLevel)}
                    </Text>
                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.btnAlimentar]}
                        onPress={alimentarPet}
                    >
                        <MaterialCommunityIcons name="food" size={24} color="#fff" />
                        <Text style={[styles.buttonText, { color: '#fff' }]}>Alimentar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.btnDormir]}
                        onPress={aumentarDescansoPet}
                    >
                        <MaterialCommunityIcons name="sleep" size={24} color="#fff" />
                        <Text style={[styles.buttonText, { color: '#fff' }]}>Dormir</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.btnBrincar]}
                        onPress={() => {
                            console.log("Jogo aberto!");
                            setJogoAberto(true);
                        }}
                    >
                        <MaterialCommunityIcons name="robot-happy" size={24} color="#fff" />
                        <Text style={[styles.buttonText, { color: '#fff' }]}>Brincar</Text>
                    </TouchableOpacity>


                </View>
            ) : (
                <ActivityIndicator />
            )}
            <TouchableOpacity
                style={[styles.buttonContainer, styles.btnLogout]}
                onPress={voltar}
            >
                <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
                <Text style={[styles.buttonText, { color: '#fff' }]}>Voltar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default DetalhesPet;
