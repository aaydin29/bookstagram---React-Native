import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import database from '@react-native-firebase/database';

import FavReadCard from '../../components/cards/FavReadCard/FavReadCard';
import styles from './OtherUserProfile.style';

const windowWidth = Dimensions.get('window').width;

const OtherUserProfile = ({route, navigation}) => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [user, setUser] = useState(null);
  const {userId} = route.params;
  const [sliderState, setSliderState] = useState({
    currentPage: 1,
  });

  useEffect(() => {
    const userRef = database().ref(`users/${userId}`);
    userRef.on('value', snapshot => {
      setUser(snapshot.val());
      console.log(snapshot.val());

      if (snapshot.val() && snapshot.val().favorites) {
        const favoriteBooksData = snapshot.val().favorites;
        const favoriteBooksArray = Object.keys(favoriteBooksData).map(
          bookId => ({
            id: bookId,
            ...favoriteBooksData[bookId].book.volumeInfo,
          }),
        );
        setFavoriteBooks(favoriteBooksArray);
      }

      if (snapshot.val() && snapshot.val().readed) {
        const readBooksData = snapshot.val().readed;
        const readBooksArray = Object.keys(readBooksData).map(bookId => ({
          id: bookId,
          ...readBooksData[bookId].book.volumeInfo,
        }));
        setReadBooks(readBooksArray);
      }
    });

    return () => userRef.off();
  }, [userId]);

  //   useEffect(() => {
  //     database()
  //       .ref(`users/${userId}/favoriteBooks`)
  //       .on('value', snapshot => {
  //         const booksData = snapshot.val();
  //         const books = [];

  //         for (const bookId in booksData) {
  //           const book = booksData[bookId];
  //           books.push(book);
  //         }
  //         setFavoriteBooks(books);
  //         // console.log(books);
  //       });
  //   }, [userId]);

  //   useEffect(() => {
  //     database()
  //       .ref(`users/${userId}/readBooks`)
  //       .on('value', snapshot => {
  //         const booksData = snapshot.val();
  //         const books = [];

  //         for (const bookId in booksData) {
  //           const book = booksData[bookId];
  //           books.push(book);
  //         }
  //         setReadBooks(books);
  //       });
  //   }, [userId]);

  //   useEffect(() => {
  //     const userRef = database().ref(`users/${userId}`);
  //     userRef.on('value', snapshot => {
  //       setUser(snapshot.val());
  //       console.log(snapshot.val());
  //     });
  //     return () => userRef.off();
  //   }, [userId]);

  const switchPage = page => {
    //It is used to make two different impressions inside a page.
    setSliderState({
      currentPage: page,
    });
  };

  const handleBookSelect = item => {
    //When the book is selected, it goes to the detail page of the selected book.
    navigation.navigate('BookDetail', {item});
  };

  const renderFavCard = ({item}) => (
    //Using a different component to list the data in the Flatlist.
    <FavReadCard
      volumeInfo={item.volumeInfo}
      id={item.id}
      onPress={() => handleBookSelect(item)}
    />
  );

  const renderReadCard = ({item}) => (
    //Using a different component to list the data in the Flatlist.
    <FavReadCard
      volumeInfo={item.volumeInfo}
      id={item.id}
      onPress={() => handleBookSelect(item)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        {user && user.photos && user.photos.banner ? (
          <ImageBackground
            style={styles.banner_image}
            source={{uri: user.photos.banner}}
          />
        ) : (
          <ImageBackground
            style={styles.banner_image}
            source={require('../../assest/images/defaultBanner.png')}
          />
        )}
        {user && user.photos && user.photos.profile ? (
          <Image
            style={styles.profile_image}
            source={{uri: user.photos.profile}}
          />
        ) : (
          <Image
            style={styles.profile_image}
            source={require('../../assest/images/defaultProfile.png')}
          />
        )}
      </View>
      <View style={styles.info_container}>
        <View style={styles.user_container}>
          <Text style={styles.username}>{user?.profile?.name} /</Text>
          <Text style={styles.userage}> {user?.profile?.age}</Text>
        </View>
      </View>
      <View style={styles.menu_container}>
        <TouchableOpacity
          onPress={() => switchPage(1)}
          style={
            sliderState.currentPage === 1
              ? styles.menu_title_selected
              : styles.menu_title
          }>
          <Text style={styles.menu_title}>Readed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => switchPage(2)}
          style={
            sliderState.currentPage === 2
              ? styles.menu_title_selected
              : styles.menu_title
          }>
          <Text style={styles.menu_title}>Favorites</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        <View style={[styles.list_container, {width: windowWidth}]}>
          {sliderState.currentPage === 1 ? (
            <FlatList data={readBooks} renderItem={renderReadCard} />
          ) : (
            <FlatList data={favoriteBooks} renderItem={renderFavCard} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default OtherUserProfile;
