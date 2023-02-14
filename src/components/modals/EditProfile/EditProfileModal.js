import React, {useState, useEffect} from 'react';
import {View, TextInput, Image, Text, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {launchImageLibrary} from 'react-native-image-picker';
import styles from './EditProfileModal.style';
import Modal from 'react-native-modal';

const EditProfileModal = ({isVisible, onClose, onSend, userId}) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const user = auth().currentUser;
    const userId = user.uid;
    database()
      .ref(`users/${userId}/photos`)
      .on('value', snapshot => {
        setPhotos(snapshot.val());
      });
  }, []);

  const addProfilePhoto = () => {
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
        console.log('user Cancelled');
      } else if (response.errorCode) {
        console.log('error');
      } else {
        const path = response.assets[0].uri;
        database().ref(`users/${userId}/photos/profile`).set(path);
      }
    });
  };

  const addBannerPhoto = () => {
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
        console.log('user Cancelled');
      } else if (response.errorCode) {
        console.log('error');
      } else {
        const path = response.assets[0].uri;
        database().ref(`users/${userId}/photos/banner`).set(path);
      }
    });
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Profile</Text>
        <View style={styles.photoContainer}>
          <TouchableOpacity onPress={addProfilePhoto}>
            {photos ? (
              <Image
                style={styles.profilePhoto}
                source={{uri: photos.profile}}
              />
            ) : (
              <Image
                style={styles.profilePhoto}
                source={require('../../../assest/images/defaultProfile.png')}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={addBannerPhoto}>
            {photos ? (
              <Image style={styles.bannerPhoto} source={{uri: photos.banner}} />
            ) : (
              <Image
                style={styles.bannerPhoto}
                source={require('../../../assest/images/defaultBanner.png')}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTitle}>Name</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Enter your name here.."
          />
        </View>
        <View style={styles.ageContainer}>
          <Text style={styles.ageTitle}>Age</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Enter your age here.."
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={onSend}>
          <Text style={styles.buttonTitle}>Save</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EditProfileModal;
