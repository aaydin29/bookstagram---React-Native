import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './FavReadCard.style';
import Icon from 'react-native-vector-icons/Feather';

const FavReadCard = props => {
  const {id, handleDeleteFavorites} = props;

  return (
    <View style={styles.container}>
      <View style={styles.info_container}>
        {props.volumeInfo.imageLinks !== undefined ? (
          <Image
            style={styles.image}
            source={{uri: props.volumeInfo.imageLinks.thumbnail}}
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
          <Text style={styles.title}>{props.volumeInfo.title}</Text>
          <Text style={styles.authors}>
            {props.volumeInfo.authors.join(', ')}
          </Text>
        </View>
        <Icon
          style={styles.icon}
          name="delete"
          size={30}
          onPress={() => handleDeleteFavorites(id)}
        />
      </View>
    </View>
  );
};

export default FavReadCard;
