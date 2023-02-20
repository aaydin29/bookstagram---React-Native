import React from 'react';
import {View, Image} from 'react-native';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

import styles from './Sign.style';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import authErrorMessage from '../../../utils/authErrorMessage';

const initialFormValues = {
  usermail: '',
  password: '',
  repassword: '',
};

const Sign = ({navigation}) => {
  function handleBackToLogin() {
    navigation.goBack();
  }

  async function handleFormSubmit(formValues) {
    //Checks the passwords to match.
    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: 'Passwords must match!',
        type: 'danger',
      });
      return;
    }
    try {
      //Allows the user to create an account.
      await auth().createUserWithEmailAndPassword(
        formValues.usermail,
        formValues.repassword,
      );
      showMessage({
        message: 'User created successfully!',
        type: 'success',
      });
      navigation.navigate('Login');
    } catch (error) {
      showMessage({
        message: authErrorMessage(error.code),
        type: 'danger',
      });
    }
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
        <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
          {({values, handleChange, handleSubmit}) => (
            <>
              <Input
                value={values.usermail}
                onChangeText={handleChange('usermail')}
                placeholder="Enter your e-mail..."
                name="envelope"
                size={17}
              />
              <Input
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Enter your password..."
                name="key"
                size={17}
                isSecure
              />
              <Input
                value={values.repassword}
                onChangeText={handleChange('repassword')}
                placeholder="Enter your password again..."
                name="key"
                size={17}
                isSecure
              />
              <Button text="Sign up" onPress={handleSubmit} />
            </>
          )}
        </Formik>
        <Button
          text="Back to Login"
          theme="secondary"
          onPress={handleBackToLogin}
        />
      </View>
    </View>
  );
};

export default Sign;
