import React, {useState, useEffect} from 'react';
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
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Profile.style';
import FavReadCard from '../../../components/cards/FavReadCard/FavReadCard';

const windowWidth = Dimensions.get('window').width;

const Profile = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [readed, setReaded] = useState([]);
  const [sliderState, setSliderState] = useState({
    currentPage: 1,
  });
  useEffect(() => {
    //It allows a message to be given when the user first enters the profile section.
    AsyncStorage.getItem('isProfileVisited').then(value => {
      if (value === 'yes') {
        setIsFirstVisit(false);
      } else {
        AsyncStorage.setItem('isProfileVisited', 'yes');
      }
    });
  }, []);

  useEffect(() => {
    //It allows a message to be given when the user first enters the profile section.
    if (isFirstVisit) {
      showMessage({
        message:
          'You can edit your profile by clicking the Edit Profile button.',
        type: 'info',
      });
    }
  }, [isFirstVisit]);

  useEffect(() => {
    //It is used to access the user's data in the database.
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
    //It is used to access the user's data in the database.
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
    //It is used to make two different impressions inside a page.
    setSliderState({
      currentPage: page,
    });
  };

  const handleDeleteFavorites = async id => {
    //It is used to delete data with this data ID.
    const user = auth().currentUser;
    const userId = user.uid;
    await database().ref(`users/${userId}/favorites/${id}`).remove();
  };

  const handleDeleteReaded = async id => {
    //It is used to delete data with this data ID.
    const user = auth().currentUser;
    const userId = user.uid;
    await database().ref(`users/${userId}/readed/${id}`).remove();
  };

  const renderFavCard = ({item}) => (
    //Using a different component to list the data in the Flatlist.
    <FavReadCard
      volumeInfo={item.volumeInfo}
      id={item.id}
      handleDelete={handleDeleteFavorites}
    />
  );

  const renderReadCard = ({item}) => (
    //Using a different component to list the data in the Flatlist.
    <FavReadCard
      volumeInfo={item.volumeInfo}
      id={item.id}
      handleDelete={handleDeleteReaded}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        <ImageBackground
          style={styles.banner_image}
          source={require('../../../assest/images/defaultBanner.png')}
        />
        <Image
          style={styles.profile_image}
          source={require('../../../assest/images/defaultProfile.png')}
        />
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
