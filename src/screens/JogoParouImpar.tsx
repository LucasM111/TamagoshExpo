import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 25,
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  choiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  choiceButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    width: 120,
    alignItems: 'center',
  },
  choiceText: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    marginVertical: 10,
    width: 200,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonTextModal: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 20,
    margin: 10,
    width: 120,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonTextModalEncerrar: {
    backgroundColor: '#ff0008',
    padding: 15,
    borderRadius: 20,
    margin: 10,
    width: 120,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

const JogoParOuImpar = ({ onGameEnd }: { onGameEnd: (isWinner: boolean) => void }) => {
  const [escolhaDoUsuario, setEscolhaDoUsuario] = useState('');
  const [numeroUsuario, setNumeroUsuario] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [userWins, setUserWins] = useState(false);

  const handlePlayGame = () => {
    if (escolhaDoUsuario !== '' && numeroUsuario !== '') {
      const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
      console.log('Número aleatório gerado:', numeroAleatorio);

      const total = parseInt(numeroUsuario) + numeroAleatorio;
      const resultadoParOuImpar = total % 2 === 0;

      const userWins =
        (escolhaDoUsuario === 'Par' && resultadoParOuImpar) || (escolhaDoUsuario === 'Impar' && !resultadoParOuImpar);
      console.log('Resultado do jogo:', userWins);

      setModalContent(
        `${userWins ? 'VOCÊ HUMILHOU O INIMIGO! PARABÉNS!' : 'QUE VERGONHA, VOCÊ DEIXOU O INIMIGO TE HUMILHAR'}\n
        Sua escolha: ${escolhaDoUsuario}\n
        Seu Número: ${numeroUsuario}\n
        Número do Adversário: ${numeroAleatorio}\n
        Soma dos Números: ${total}\n
        Resultado do Jogo: ${resultadoParOuImpar ? 'Par' : 'Ímpar'}`
      );
      setModalVisible(true);
      setUserWins(userWins);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>

        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1 }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
        ></KeyboardAwareScrollView>
        <Text style={styles.text}>Escolha entre Par ou Ímpar:</Text>
        <View style={styles.choiceContainer}>
          <TouchableOpacity style={styles.choiceButton} onPress={() => setEscolhaDoUsuario('Par')}>
            <Text style={styles.choiceText}>Par</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.choiceButton} onPress={() => setEscolhaDoUsuario('Impar')}>
            <Text style={styles.choiceText}>Ímpar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>Digite um número:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={numeroUsuario}
          onChangeText={(text) => setNumeroUsuario(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handlePlayGame}>
          <Text style={styles.buttonText}>Jogar</Text>
        </TouchableOpacity>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalContent}</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setEscolhaDoUsuario('');
                setNumeroUsuario('');
              }}
            >
              <Text style={styles.buttonTextModal}>Continuar</Text>
            </TouchableOpacity>
            {/* @ts-ignore */}
            <TouchableOpacity onPress={() => { setModalVisible(false); onGameEnd(); }}>
              <Text style={styles.buttonTextModalEncerrar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default JogoParOuImpar;
