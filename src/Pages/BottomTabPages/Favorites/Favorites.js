import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import styles from './Favorites.style';
import FavReadCard from '../../../components/cards/FavReadCard/FavReadCard';

const Favorites = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //It pulls the books that the user has added to favorites from the database and adds to the favorites state.
    const user = auth().currentUser;
    const userId = user.uid;
    database()
      .ref(`users/${userId}/favorites`)
      .on('value', snapshot => {
        const data = snapshot.val();
        const favoriteBooks = [];
        for (const key in data) {
          favoriteBooks.push({
            ...data[key].book,
            id: key,
          });
          setLoading(false);
        }
        setFavorites(favoriteBooks);
      });
  }, []);

  const handleDeleteFavorites = async id => {
    //It allows the user to delete the selected book from favorites.
    const user = auth().currentUser;
    const userId = user.uid;
    await database().ref(`users/${userId}/favorites/${id}`).remove();
  };

  const handleBookSelect = item => {
    //When the book is selected, it goes to the detail page of the selected book.
    navigation.navigate('BookDetail', {item});
  };

  const renderFavCard = ({item}) => (
    <FavReadCard
      volumeInfo={item.volumeInfo}
      id={item.id}
      handleDelete={handleDeleteFavorites}
      onPress={() => handleBookSelect(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : favorites.length === 0 ? (
        <Text style={styles.ifMessage}>
          You don't have any favorite books yet...
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          renderItem={renderFavCard}
        />
      )}
    </View>
  );
};

export default Favorites;
