import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, FlatList, SafeAreaView, View, Text, TouchableOpacity, Modal, Image } from "react-native";
import axios from '../axios.configs';
import { Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#252126",
        alignItems: 'center',
        padding: 20
    },
    card: {
        borderWidth: 2,
        borderRadius: 20,
        margin: 5,
        padding: 10,
        width: 380,
        height: 200,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderColor: '#0c7a02',
        flexDirection: 'row',
        justifyContent: 'space-between',
        Border: 50,
    },
    Text: {
        fontSize: 13,
        alignItems: 'center'

    },
    TextDetalhes: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 15,
    },
    IconeDeletar: {
        backgroundColor: '#d92a02',
        padding: 11,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    confirmarDelete: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextConfirmDelete: {
        color: 'white',
        fontSize: 18,
        marginBottom: 20,
    },
    ContainerButton: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btnCad: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    Confirmar: {
        backgroundColor: 'red',
    },
    Cancelar: {
        backgroundColor: 'green',
    },
    buttonText: {
        color: 'white',
    },
    imagem: {
        width: 200,
        height: 100,
        marginTop: 20,
    }
});


type ListItemProps = {
    pets: {
        id: string;
        name: string;
    };
    onDelete: (id: string) => void;
}

const ListItem = ({ pets, onDelete }: ListItemProps) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDelete = async (id: string) => {
        setShowConfirmation(true);
    };

    const Delete = async (id: string) => {
        try {
            await axios.delete(`/pet/${id}`);
            onDelete(id);
        } catch (error) {
            console.error('Erro ao excluir', error);
        } finally {
            setShowConfirmation(false);
        }
    };

    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.Text}>ID: {pets.id}</Text>
                <Text style={styles.TextDetalhes}>Nome: {pets.name}</Text>
                <Image source={require('../assets/bemvindo.png')} style={styles.imagem} />

            </View>
            <TouchableOpacity onPress={() => handleDelete(pets.id)} style={styles.IconeDeletar}>
                <Feather name="trash-2" size={30} color="white" />
            </TouchableOpacity>
            <Modal transparent={true} animationType="slide" visible={showConfirmation}>
                <View style={styles.confirmarDelete}>
                    <Text style={styles.TextConfirmDelete}>Tem certeza que quer deletar o PET {pets.name}?</Text>
                    <View style={styles.ContainerButton}>
                        <TouchableOpacity
                            style={[styles.btnCad, styles.Confirmar]}
                            onPress={() => Delete(pets.id)}
                        >
                            <Text style={styles.buttonText}>Sim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btnCad, styles.Cancelar]}
                            onPress={() => setShowConfirmation(false)}
                        >
                            <Text style={styles.buttonText}>Não</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const ListPage = () => {
    const [pets, setPets] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(false);

    const handleDeletePet = (deletedId: string) => {
        setPets((prevPets) => prevPets.filter((pet) => pet.id !== deletedId));
    };

    const getPets = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/pets');
            setPets(data.pets);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getPets();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {loading === true ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={pets}
                    renderItem={({ item }) => <ListItem pets={item} onDelete={handleDeletePet} />}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </SafeAreaView>
    );
}

export default ListPage;
