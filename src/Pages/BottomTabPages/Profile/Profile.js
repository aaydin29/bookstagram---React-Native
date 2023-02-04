import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Profile.style';

//Random photo for start- i will deleted that
const photo1 =
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fD2B8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80';
const photo2 =
  'https://e1.pxfuel.com/desktop-wallpaper/207/201/desktop-wallpaper-black-blackheader-twitter-header-aesthetic-black-twitter-3464x1948-for-your-mobile-tablet-twitter-banner-thumbnail.jpg';

const windowWidth = Dimensions.get('window').width;

const Profile = () => {
  const slider = useRef(null);
  const [sliderState, setSliderState] = useState({
    offset: 0,
  });

  const switchPage = () => {
    slider.current.scrollToOffset({
      offset: sliderState.offset - windowWidth,
      animated: true,
    });
  };

  const switchPage2 = () => {
    slider.current.scrollToOffset({
      offset: sliderState.offset - windowWidth,
      animated: true,
    });
  };

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
          <Text style={styles.username}>Özge </Text>
          <Text style={styles.userage}> / 25</Text>
        </View>
      </View>
      <View style={styles.menu_container}>
        <TouchableOpacity onPress={switchPage}>
          <Text style={styles.menu_title}>Readed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={switchPage2}>
          <Text style={styles.menu_title}>Favorites</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
