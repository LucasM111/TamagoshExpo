import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, FlatList, SafeAreaView, ScrollView, View, Text } from "react-native";
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
    },
    card: {
        borderWidth: 2,
        borderRadius: 20,
        margin: 5,
        padding: 14,
        width: 250,
        height: 110,
        backgroundColor: '#fff',
        alignItems: 'baseline',
        borderColor: '#fff'
    },
})

type ListItemProps = {
    pets: {
        id: string;
        name: string;
    };
}

const ListItem = ({ pets }: ListItemProps) => {
    return (
        <View>
            <Text>{pets.id}</Text>
            <Text>{pets.name}</Text>
        </View>);
}

const ListPage = () => {
    const [pets, setPets] = useState();
    const [loading, setLoading] = useState(false);

    const getPets = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/pets',);
            setPets(data.pets);
            // console.log(data);
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
        <SafeAreaView >
            {loading === true ? <ActivityIndicator /> : <FlatList data={pets} renderItem={({ item }) => <ListItem pets={item} />} />}
        </SafeAreaView>


    );
}

export default ListPage;