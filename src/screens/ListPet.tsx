import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, FlatList, SafeAreaView, View, Text, TouchableOpacity, Modal, Image, Button, TextInput } from "react-native";
import axios from '../axios.configs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import user from "../store/user";



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
        backgroundColor: '#ff0000',
        padding: 11,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    IconeEditar: {
        backgroundColor: '#118003',
        padding: 11,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmarDelete: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmarEditar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextEdit: {
        margin: 5,
        width: 300,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 10
    },
    TextConfirmDelete: {
        color: 'black',
        fontSize: 18,
        marginBottom: 20,
    },
    TextConfirmEdit: {
        color: '#fff',
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
    logoutButton: {
        margin: 10,
        width: 200,
        height: 40,
        backgroundColor: '#b7ff00',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
    },
    Confirmar: {
        backgroundColor: 'red',
    },
    Cancelar: {
        backgroundColor: 'blue',
    },
    ConfirmarEdit: {
        backgroundColor: 'green',
    },
    CancelarEdit: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
    },
    imagem: {
        width: 110,
        height: 100,
        marginTop: 20,
    },
    btnCadastrarPET: {
        margin: 10,
        width: 200,
        height: 40,
        backgroundColor: '#b7ff00',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
    },
});


type ListItemProps = {
    pets: {
        id: string;
        name: string;
    };
    onDelete: (id: string) => void;
}


const ListItem = ({ pets, onDelete }: ListItemProps) => {
    const navigation = useNavigation();
    const [Confirmarcao, setConfirmarcao] = useState(false);
    const [confirmEdit, setConfirmEdit] = useState(false);
    const [newName, setNewName] = useState(pets.name);

    const Exclusao = async (id: string) => {
        setConfirmarcao(true);
    };

    const handleEdit = () => {
        setConfirmEdit(true);
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`/pet/${pets.id}`, { name: newName });
            setConfirmEdit(false);
        } catch (error) {
            console.error('Erro ao editar o nome do PET', error);
            setConfirmEdit(false);
        }
    };

    const Delete = async (id: string) => {
        try {
            await axios.delete(`/pet/${id}`);
            onDelete(id);
        } catch (error) {
            console.error('Erro ao excluir', error);
        } finally {
            setConfirmarcao(false);
        }
    };

    const handleCardClick = () => {
        navigation.navigate('DetalhesPet', { id: pets.id, name: pets.name });
    };

    return (
        <TouchableOpacity onPress={handleCardClick}>
            <View style={styles.card}>
                <View>
                    <Text style={styles.Text}>ID: {pets.id}</Text>
                    <Text style={styles.TextDetalhes}>Nome: {pets.name}</Text>
                    <Image source={require('../assets/ChibiKurama.png')} style={styles.imagem} />
                </View>
                <TouchableOpacity onPress={handleEdit} style={styles.IconeEditar}>
                    <MaterialCommunityIcons name="pencil" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Exclusao(pets.id)} style={styles.IconeDeletar}>
                    <MaterialCommunityIcons name="delete-forever" size={30} color="white" />
                </TouchableOpacity>

                <Modal transparent={true} animationType="slide" visible={Confirmarcao}>
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
                                onPress={() => setConfirmarcao(false)}
                            >
                                <Text style={styles.buttonText}>Não</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal transparent={true} animationType="slide" visible={confirmEdit}>
                    <View style={styles.confirmarEditar}>
                        <Text style={styles.TextConfirmEdit}>Deseja editar o nome do PET {pets.name}?</Text>
                        <TextInput
                            style={styles.TextEdit}
                            value={newName}
                            onChangeText={(text) => setNewName(text)}
                        />
                        <View style={styles.ContainerButton}>
                            <TouchableOpacity
                                style={[styles.btnCad, styles.ConfirmarEdit]}
                                onPress={handleSaveEdit}
                            >
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btnCad, styles.CancelarEdit]}
                                onPress={() => setConfirmEdit(false)}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        </TouchableOpacity>

    );
}

const ListPet = () => {
    const [pets, setPets] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(false);

    const logout = () => {
        user.setState({ token: null });
        navigation.navigate('Login');
    };

    const ExclusaoPet = (deletedId: string) => {
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

    const navigation = useNavigation();

    const navigateToCadPets = () => {
        navigation.navigate('CadPets');
    };


    return (
        <SafeAreaView style={styles.container}>
            {loading === true ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={pets}
                    renderItem={({ item }) => <ListItem pets={item} onDelete={ExclusaoPet} />}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
            <TouchableOpacity style={styles.btnCadastrarPET}>
                <Button title="Cadastrar PET" onPress={navigateToCadPets} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton}>
                <Button title="Deslogar" onPress={logout} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default ListPet;


