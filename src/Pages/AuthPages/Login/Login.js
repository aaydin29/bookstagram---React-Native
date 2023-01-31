import React from 'react';
import {View, Image} from 'react-native';

import styles from './Login.style';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

const Login = ({navigation}) => {
  function handleSign() {
    navigation.navigate('Sign');
  }

  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        <Image
          style={styles.image}
          source={require('../../../assest/images/logo.png')}
        />
      </View>
      <View style={styles.login_container}>
        <Input placeholder="Enter your e-mail..." name="envelope" size={17} />
        <Input
          placeholder="Enter your password..."
          name="key"
          size={17}
          isSecure
        />
        <View style={styles.button_container}>
          <Button text="Login" />
          <Button text="Sign up" theme="secondary" onPress={handleSign} />
        </View>
      </View>
    </View>
  );
};

export default Login;
