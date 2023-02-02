import React from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  return (
    <View>
      <Text>Hello Profile</Text>
      <Button title="Logout" onPress={() => auth().signOut()} />
    </View>
  );
};

export default Profile;
