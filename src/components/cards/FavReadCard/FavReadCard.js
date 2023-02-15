import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './FavReadCard.style';
import Icon from 'react-native-vector-icons/Feather';

const FavReadCard = ({volumeInfo, id, handleDelete, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.info_container}>
          {volumeInfo.imageLinks !== undefined ? (
            <Image
              style={styles.image}
              source={{uri: volumeInfo.imageLinks.thumbnail}}
            />
          ) : (
            <Image
              source={{
                uri: 'https://i.pinimg.com/564x/1d/75/b9/1d75b954363bc000b9008ad05a5823e8.jpg',
              }}
              style={styles.image}
            />
          )}
          <View style={styles.text_container}>
            <Text style={styles.title}>{volumeInfo.title}</Text>
            <Text style={styles.authors}>{volumeInfo.authors.join(', ')}</Text>
          </View>
          <Icon
            style={styles.icon}
            name="delete"
            size={30}
            onPress={() => handleDelete(id)}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FavReadCard;
