import React from 'react';
import {View, TextInput} from 'react-native';
import styles from './Input.style';
import Icon from 'react-native-vector-icons/FontAwesome';

const Input = ({placeholder, onChangeText, value, isSecure, name, size}) => {
  return (
    <View style={styles.input_container}>
      <TextInput
        style={styles.input_text}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={isSecure}
      />
      <Icon name={name} size={size} />
    </View>
  );
};

export default Input;
