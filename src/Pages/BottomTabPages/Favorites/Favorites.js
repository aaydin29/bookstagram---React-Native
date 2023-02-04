import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import styles from './Favorites.style';
import FavReadCard from '../../../components/cards/FavReadCard/FavReadCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
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
        }
        setFavorites(favoriteBooks);
      });
  }, []);

  const handleDeleteFavorites = async id => {
    const user = auth().currentUser;
    const userId = user.uid;
    await database().ref(`users/${userId}/favorites/${id}`).remove();
  };

  const renderFavCard = ({item}) => (
    <FavReadCard
      volumeInfo={item.volumeInfo}
      id={item.id}
      handleDeleteFavorites={handleDeleteFavorites}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      {favorites.length === 0 ? (
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
