import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './Button.style';

const Button = ({text, onPress, theme = 'primary'}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles[theme].button_container}
        onPress={onPress}>
        <Text style={styles[theme].button_text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
