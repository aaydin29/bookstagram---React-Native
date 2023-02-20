import React from 'react';
import {View, Image} from 'react-native';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

import authErrorMessage from '../../../utils/authErrorMessage';
import styles from './Login.style';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

const initialFormValues = {
  usermail: '',
  password: '',
};

const Login = ({navigation}) => {
  function handleSign() {
    navigation.navigate('Sign');
  }

  async function handleFormSubmit(formValues) {
    //It allows the user to log into the system with the information has registered.
    try {
      await auth().signInWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      navigation.navigate('TabPages');
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
              <Button text="Login" onPress={handleSubmit} />
            </>
          )}
        </Formik>
        <Button text="Sign up" theme="secondary" onPress={handleSign} />
      </View>
    </View>
  );
};

export default Login;
