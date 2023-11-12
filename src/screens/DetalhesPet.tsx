import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity, Button, ActivityIndicator, Alert } from 'react-native';
import axios from '../axios.configs';
import JogoParOuImpar from "./JogoParouImpar";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252126',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#333',
        borderRadius: 15,
        padding: 20,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    petDetails: {
        fontSize: 13,
        alignItems: 'center',
        color: '#fff',
        margin: 10,
    },
    petDetailsNome: {
        fontSize: 50,
        color: '#fff',
        margin: 10,
    },
    image: {
        width: 150,
        height: 150,
        margin: 10,
    },
    btn: {
        margin: 10,
        width: 200,
        height: 40,
        backgroundColor: '#b7ff00',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
    },
    petDetailsStats: {
        fontSize: 13,
        alignItems: 'center',
        color: '#fff',
        margin: 10,
        textAlign: 'justify',
    },
    petDetailsNivel: {
        fontSize: 20,
        color: '#fff',
        margin: 10,
        alignItems: 'center',
        textAlign: 'justify',
    },
});

const getPetDetails = async (id) => {
    try {
        const response = await axios.get(`/pet/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar detalhes do pet', error);
        return null;
    }
};


const DetalhesPet = ({ route }: any) => {
    const { id, imagem } = route.params;
    const [petDetails, setPetDetails] = useState(null);
    const [jogoAberto, setJogoAberto] = useState(false);



    const handleGameEnd = () => {
        setJogoAberto(false);
        brincarComPet();


    };

    const alimentarPet = async () => {
        try {
            const DescansoAntes = Math.floor(Math.round(petDetails?.life));
            const fomeAntes = Math.floor(Math.round(petDetails?.foodLevel));

            await axios.post(`/pet/${id}/food`);
            console.log('Pet alimentado com sucesso!');

            if (petDetails) {
                const novoNivelVida = petDetails.life + 1;
                const novoNivelFome = Math.floor(Math.round(petDetails.foodLevel - 5));

                setPetDetails({
                    ...petDetails,
                    life: novoNivelVida,
                    foodLevel: novoNivelFome
                });

                const vidaDepois = Math.floor(Math.round(novoNivelVida));
                const fomeDepois = Math.floor(Math.round(novoNivelFome));

                Alert.alert("Agora o Pet ta de pancinha cheia",
                    `Nível de vida: ${DescansoAntes} > ${vidaDepois}
                    \nNível de fome: ${fomeAntes} > ${fomeDepois}`);
            }
        } catch (error) {
            console.error('Erro ao alimentar o pet', error);
            Alert.alert('Houve um erro ao tentar alimentar o pet');
        }
    };



    const aumentarDescansoPet = async () => {
        try {
            const vidaAntes = Math.floor(Math.round(petDetails?.life));

            await axios.post(`/pet/${id}/rest`);
            console.log('Descanso do pet aumentado com sucesso!');

            if (petDetails) {
                const novaVida = petDetails.life + 1;

                setPetDetails({
                    ...petDetails,
                    life: novaVida
                });

                const vidaDepois = Math.floor(Math.round(novaVida));

                Alert.alert("Pet Dormiu e Descansou",
                    `Nível de vida: ${vidaAntes} > ${vidaDepois}`);
            }
        } catch (error) {
            console.error('Erro ao aumentar o descanso do pet', error);
            Alert.alert('Houve um erro ao tentar aumentar o descanso do pet');
        }
    };


    const brincarComPet = async () => {
        try {
            const DiversaoAntes = Math.floor(Math.round(petDetails?.funLevel));

            await axios.post(`/pet/${id}/play`);
            console.log('Descanso do pet aumentado com sucesso!');

            if (petDetails) {
                const Novadiversao = petDetails.funLevel + 1;

                setPetDetails({
                    ...petDetails,
                    funLevel: Novadiversao
                });

                const DiversaoDepois = Math.floor(Math.round(Novadiversao));

                Alert.alert("O Pet ta Euforico com o Jogo",
                    `Nível de Diversão: ${DiversaoAntes} > ${DiversaoDepois}`);
            }
        } catch (error) {
            console.error('Erro ao aumentar o descanso do pet', error);
            Alert.alert('Houve um erro ao tentar aumentar o descanso do pet');
        }
    };
    useEffect(() => {
        const { id } = route.params;
        const fetchPetDetails = async () => {
            const details = await getPetDetails(id);
            // console.log('Detalhes do pet:', details); 
            setPetDetails(details);
        };
        fetchPetDetails();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {jogoAberto ? (
                <JogoParOuImpar onGameEnd={handleGameEnd} />
            ) : (
                petDetails ? (
                    <View style={styles.card}>
                        <Text style={styles.petDetails}>ID: {petDetails.id}</Text>
                        <Text style={styles.petDetailsNome}>{petDetails.name}</Text>
                        <Text style={styles.petDetailsNivel}>Level: {Math.round(petDetails.restLevel)}</Text>
                        <Image source={imagem} style={styles.image} />
                        <Text style={styles.petDetailsStats}>Vida: {Math.round(petDetails.life)}</Text>
                        <Text style={styles.petDetailsStats}>Diversão: {Math.round(petDetails.funLevel)}</Text>
                        <Text style={styles.petDetailsStats}>Fome: {Math.round(petDetails.foodLevel)}</Text>

                        <TouchableOpacity style={styles.btn}>
                            <Button onPress={alimentarPet} title="Alimentar" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn}>
                            <Button onPress={aumentarDescansoPet} title="Dormir" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn}>
                            <Button onPress={() => {
                                console.log('Jogo aberto!');
                                setJogoAberto(true);
                            }} title="Brincar" />
                        </TouchableOpacity>

                    </View>
                ) : (
                    <ActivityIndicator />
                ))}
        </SafeAreaView>
    );
};

export default DetalhesPet;
