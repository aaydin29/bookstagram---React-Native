import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Profile.style';
import FavReadCard from '../../../components/cards/FavReadCard/FavReadCard';

//Random photo for start- i will deleted that
const photo1 =
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fD2B8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80';
const photo2 =
  'https://e1.pxfuel.com/desktop-wallpaper/207/201/desktop-wallpaper-black-blackheader-twitter-header-aesthetic-black-twitter-3464x1948-for-your-mobile-tablet-twitter-banner-thumbnail.jpg';

const windowWidth = Dimensions.get('window').width;

const Profile = () => {
  const [favorites, setFavorites] = useState([]);
  const [readed, setReaded] = useState([]);
  const [sliderState, setSliderState] = useState({
    currentPage: 1,
  });

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

  useEffect(() => {
    const user = auth().currentUser;
    const userId = user.uid;
    database()
      .ref(`users/${userId}/readed`)
      .on('value', snapshot => {
        const data = snapshot.val();
        const readedBooks = [];
        for (const key in data) {
          readedBooks.push({
            ...data[key].book,
            id: key,
          });
        }
        setReaded(readedBooks);
      });
  }, []);

  const switchPage = page => {
    setSliderState({
      currentPage: page,
    });
  };

  const handleDeleteFavorites = async id => {
    const user = auth().currentUser;
    const userId = user.uid;
    await database().ref(`users/${userId}/favorites/${id}`).remove();
  };

  const handleDeleteReaded = async id => {
    const user = auth().currentUser;
    const userId = user.uid;
    await database().ref(`users/${userId}/readed/${id}`).remove();
  };

  const renderFavCard = ({item}) => (
    <FavReadCard
      volumeInfo={item.volumeInfo}
      id={item.id}
      handleDelete={handleDeleteFavorites}
    />
  );

  const renderReadCard = ({item}) => (
    <FavReadCard
      volumeInfo={item.volumeInfo}
      id={item.id}
      handleDelete={handleDeleteReaded}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        <ImageBackground style={styles.banner_image} source={{uri: photo2}} />
        <Image style={styles.profile_image} source={{uri: photo1}} />
      </View>
      <View style={styles.info_container}>
        <View style={styles.edit_and_logout_container}>
          <TouchableOpacity style={styles.edit_button}>
            <Text style={styles.edit_text}>Edit Profile</Text>
          </TouchableOpacity>
          <Icon
            style={styles.logout_icon}
            name="logout"
            size={40}
            onPress={() => auth().signOut()}
          />
        </View>
        <View style={styles.user_container}>
          <Text style={styles.username}>Abdurrahman </Text>
          <Text style={styles.userage}> / 25</Text>
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
            <FlatList
              data={readed}
              keyExtractor={item => item.id}
              renderItem={renderReadCard}
            />
          ) : (
            <FlatList
              data={favorites}
              keyExtractor={item => item.id}
              renderItem={renderFavCard}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
