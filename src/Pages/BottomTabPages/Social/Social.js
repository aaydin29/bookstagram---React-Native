import React, {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';

import FloatingButton from '../../../components/FloatingButton/FloatingButton';
import styles from './Social.style';
import MessageModal from '../../../components/modals/MessageModal/MessageModal';
import PostCard from '../../../components/cards/PostCard/PostCard';

const Social = () => {
  const [photos, setPhotos] = useState();
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //It pull the photos from the database.
    const user = auth().currentUser;
    const userId = user.uid;
    database()
      .ref(`users/${userId}/photos`)
      .on('value', snapshot => {
        setPhotos(snapshot.val());
      });
    setLoading(false);
  }, []);

  const handleMessageModal = () => {
    setMessageModalVisible(true);
  };

  const handleMessageModalClose = () => {
    setMessageModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Icon style={styles.header_icon} name="book" size={23} color="white" />
        <Text style={styles.header_title}>BOOKSTAGRAM</Text>
        {photos && photos.profile ? (
          <Image style={styles.header_image} source={{uri: photos.profile}} />
        ) : (
          <Image
            style={styles.header_image}
            source={require('../../../assest/images/defaultProfile.png')}
          />
        )}
      </View>
      <View>{loading ? <ActivityIndicator size="large" /> : <PostCard />}</View>
      <FloatingButton onPress={handleMessageModal} icon="paper-plane" />
      <MessageModal
        isVisible={messageModalVisible}
        onClose={handleMessageModalClose}
      />
    </View>
  );
};

export default Social;
