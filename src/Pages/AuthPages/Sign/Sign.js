import React from 'react';
import {View, Image} from 'react-native';

import styles from './Sign.style';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

const Sign = ({navigation}) => {
  function handleBackToLogin() {
    navigation.goBack();
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
        <Input
          placeholder="Enter your e-mail..."
          name="envelope"
          size={17}
          isSecure
        />
        <Input
          placeholder="Enter your password..."
          name="key"
          size={17}
          isSecure
        />
        <Input
          placeholder="Enter your password again..."
          name="key"
          size={17}
        />
        <View style={styles.button_container}>
          <Button text="Sign up" />
          <Button
            text="Back to Login"
            theme="secondary"
            onPress={handleBackToLogin}
          />
        </View>
      </View>
    </View>
  );
};

export default Sign;
