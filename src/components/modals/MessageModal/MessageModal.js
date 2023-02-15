import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './MessageModal.style';

const MessageModal = ({isVisible, onClose}) => {
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState([]);

  const addPhoto = () => {
    //It sends the photo uploaded by the user to the database.
    const user = auth().currentUser;
    const userId = user.uid;
    const options = {
      title: 'Titlee',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        showMessage({
          message: 'Something went wrong.',
          type: 'danger',
        });
      } else if (response.errorCode) {
        showMessage({
          message: 'Something went wrong.',
          type: 'danger',
        });
      } else {
        const path = response.assets[0].uri;
        database().ref(`users/${userId}/shared/photo`).set(path);
      }
    });
  };

  useEffect(() => {
    //It pulls the user's shared photo data from the database and puts it into the photo state.
    const user = auth().currentUser;
    const userId = user.uid;
    database()
      .ref(`users/${userId}/shared/photo`)
      .on('value', snapshot => {
        setPhoto(snapshot.val());
      });
  }, []);

  const onSend = () => {
    const user = auth().currentUser;
    const userId = user.uid;
    database()
      .ref(`users/${userId}/shared/text`)
      .set({
        text,
      })
      .then(() => {
        showMessage({
          message: 'Successfully shared.',
          type: 'success',
        });
      });
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <View style={styles.top_container}>
          <Text style={styles.title}>How are you with books today?</Text>
          <TouchableOpacity onPress={onSend} style={styles.share_button}>
            <Text style={styles.share_button_text}>Share</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.input_container}>
          <TextInput placeholder="Enter your message here..." multiline />
          {photo ? (
            <Image style={styles.sharing_photo} source={{uri: photo}} />
          ) : null}
        </View>
        <View style={styles.icon_container}>
          <TouchableOpacity onPress={addPhoto}>
            <Icon name="camera" size={30} color="#3d342f" />
          </TouchableOpacity>
          <TouchableOpacity onPress={addPhoto}>
            <Icon name="file-gif-box" size={30} color="#3d342f" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MessageModal;
