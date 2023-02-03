import React from 'react';
import {TouchableWithoutFeedback, View, Text, Image} from 'react-native';
import styles from './BookCard.style';

const BookCard = props => {
  return (
    <TouchableWithoutFeedback onPress={props.onSelect}>
      <View style={styles.container}>
        {props.volumeInfo.imageLinks !== undefined ? (
          <Image
            source={{uri: props.volumeInfo.imageLinks.thumbnail}}
            style={styles.image}
          />
        ) : (
          <Image
            source={{
              uri: 'https://i.pinimg.com/564x/1d/75/b9/1d75b954363bc000b9008ad05a5823e8.jpg',
            }}
            style={styles.image}
          />
        )}
        <Text style={styles.title}>{props.volumeInfo.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BookCard;
