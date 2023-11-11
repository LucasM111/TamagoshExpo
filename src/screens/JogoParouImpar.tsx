import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252126',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 30,
    marginBottom: 10,
    color: '#fff',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
  },
  choiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  choiceButton: {
    backgroundColor: '#2ecc71',
    padding: 20,
    borderRadius: 5,
    margin: 10,
    width: 150,
  },
  choiceText: {
    color: '#fff',
    fontSize: 25,
    justifyContent: 'center'
  },
  input: {
    margin: 5,
    width: 300,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    color: '#fff',
    fontSize: 25,
    marginBottom: 20,
  },
  buttonTextModal: {
    backgroundColor: '#2ecc71',
    padding: 20,
    borderRadius: 20,
    margin: 10,
    width: 150,
    color: '#fff',
    fontSize: 25,
  },
  buttonTextModalEncerrar: {
    backgroundColor: '#ff0008',
    padding: 20,
    borderRadius: 20,
    margin: 10,
    width: 150,
    color: '#fff',
    fontSize: 25,
  },
});

const JogoParOuImpar = ({ onGameEnd }: { onGameEnd: (isWinner: boolean) => void }) => {
  const [userChoice, setUserChoice] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [userWins, setUserWins] = useState(false);

  const handlePlayGame = () => {
    if (userChoice !== '' && userNumber !== '') {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      console.log('Número aleatório gerado:', randomNumber);

      const total = parseInt(userNumber) + randomNumber;
      const isResultEven = total % 2 === 0;

      const userWins = (userChoice === 'Par' && isResultEven) || (userChoice === 'Impar' && !isResultEven);
      console.log('Resultado do jogo:', userWins);

      setModalContent(
        `${userWins ? 'VOCE VENCEU! HUMILHOU O INIMIGO' : 'IIIH PERDEU EM! VÁ ATRÁS DA SUA VINGANÇA'}\n
        Sua escolha: ${userChoice}\n
        Seu Numero: ${userNumber}\n
        Número do Inimigo: ${randomNumber}\n
        Soma dos números: ${total}\n
        Resultado do Jogo: ${isResultEven ? 'Par' : 'Ímpar'}`
      );
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Escolha entre par ou ímpar:</Text>
      <View style={styles.choiceContainer}>
        <TouchableOpacity
          style={styles.choiceButton}
          onPress={() => setUserChoice('Par')}
        >
          <Text style={styles.choiceText}>Par</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.choiceButton}
          onPress={() => setUserChoice('Impar')}
        >
          <Text style={styles.choiceText}>Ímpar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Digite um número:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={userNumber}
        onChangeText={(text) => setUserNumber(text)}
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
              setUserChoice('');
              setUserNumber('');
            }}
          >
            <Text style={styles.buttonTextModal}>Continuar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              onGameEnd(userWins);
            }}
          >
            <Text style={styles.buttonTextModalEncerrar}>Encerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default JogoParOuImpar;
