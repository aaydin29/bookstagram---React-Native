import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from './BookDetail.style';
import Icon from 'react-native-vector-icons/FontAwesome';

const BookDetail = ({route}) => {
  const {item} = route.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.top_container}>
        {item.volumeInfo.imageLinks !== undefined ? (
          <Image
            style={styles.image}
            source={{uri: item.volumeInfo.imageLinks.thumbnail}}
          />
        ) : (
          <Image
            source={{
              uri: 'https://i.pinimg.com/564x/1d/75/b9/1d75b954363bc000b9008ad05a5823e8.jpg',
            }}
            style={styles.image}
          />
        )}
        <View style={styles.info_container}>
          <Text style={styles.book_name}>{item.volumeInfo.title}</Text>
          <View style={styles.authors}>
            <Text style={styles.info_titles}>Authors: </Text>
            <Text style={styles.text}>{item.volumeInfo.authors}</Text>
          </View>
          <View style={styles.categories}>
            <Text style={styles.info_titles}>Categories: </Text>
            <Text style={styles.text}>{item.volumeInfo.categories}</Text>
          </View>
        </View>
      </View>
      <View style={styles.icon_container}>
        <Icon style={styles.icon1} name="share" size={30} />
        <Icon style={styles.icon2} name="heart" size={30} />
      </View>
      <View style={styles.desc_container}>
        <Text style={styles.desc_title}>Description</Text>
        {item.volumeInfo.description !== undefined ? (
          <Text style={styles.desc_text}>{item.volumeInfo.description}</Text>
        ) : (
          <Text style={styles.desc_text}>
            No description found for this book!
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default BookDetail;
