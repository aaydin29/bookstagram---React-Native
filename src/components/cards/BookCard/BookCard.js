import React from 'react';
import {TouchableWithoutFeedback, View, Text, Image} from 'react-native';
import styles from './BookCard.style';

const BookCard = props => {
  return (
    <TouchableWithoutFeedback onPress={props.onSelect}>
      <View style={styles.container}>
        {props.volumeInfo.imageLinks != undefined ? (
          <Image
            source={{uri: props.volumeInfo.imageLinks.thumbnail}}
            style={styles.image}
          />
        ) : (
          <Image
            source={{
              uri: 'https://www.kannemeinel.com/uploads/3/4/3/9/34391167/5133754_orig.jpg',
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
