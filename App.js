import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const buttons = [
    'LIMPAR',
    'DEL',
    '%',
    '/',
    7,
    8,
    9,
    'x',
    6,
    5,
    4,
    '-',
    3,
    2,
    1,
    '+',
    '+/-',
    0,
    '.',
    '=',
  ];

  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const [operation, setOperation] = useState('');

  const handleInput = (buttonPressed) => {
    if (buttonPressed === '+' || buttonPressed === '-' || buttonPressed === 'x' || buttonPressed === '/') {
      setOperation(buttonPressed);
      setLastNumber(currentNumber + ' ' + buttonPressed);
      setCurrentNumber('');
      return;
    }

    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.slice(0, -1));
        return;
      case 'LIMPAR':
        setLastNumber('');
        setCurrentNumber('');
        return;
      case '+/-':
        setCurrentNumber(parseFloat(currentNumber) * -1);
        return;
      case '%':
        setCurrentNumber(parseFloat(currentNumber) / 100);
        return;
      case '=':
        const current = parseFloat(currentNumber);
        const last = parseFloat(lastNumber);
        switch (operation) {
          case '+':
            setCurrentNumber((last + current).toString());
            break;
          case '-':
            setCurrentNumber((last - current).toString());
            break;
          case 'x':
            setCurrentNumber((last * current).toString());
            break;
          case '/':
            setCurrentNumber((last / current).toString());
            break;
          default:
            return;
        }
        setOperation('');
        setLastNumber('');
        return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  };

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) => (
          <TouchableOpacity
            onPress={() => handleInput(button)}
            key={button}
            style={[
              styles.button,
              {
                backgroundColor:
                  button === '=' ? '#3dd0e3' : typeof button === 'number' ? 'white' : '#0093a6',
              },
            ]}
          >
            <Text
              style={[
                styles.textButton,
                { color: button === '=' ? 'white' : typeof button === 'number' ? 'black' : '#7c7c7c' },
              ]}
            >
              {button}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  resultText: {
    color: '#282F38',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'right',
  },
  historyText: {
    color:'red' ,
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
})