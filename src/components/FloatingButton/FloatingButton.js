import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './FloatingButton.style';

const FloatingButton = ({icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={icon} color="white" size={25} />
    </TouchableOpacity>
  );
};

export default FloatingButton;
