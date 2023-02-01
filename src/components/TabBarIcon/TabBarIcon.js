import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabBarIcon = ({name}) => {
  return (
    <View>
      <Icon name={name} size={25} color="#3d342f" />
    </View>
  );
};

export default TabBarIcon;
