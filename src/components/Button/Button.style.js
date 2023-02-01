import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../styles/colors/colors';

const deviceSize = Dimensions.get('window');

const base_style = StyleSheet.create({
  button_container: {
    borderRadius: 7,
    padding: 10,
    marginTop: 15,
    width: deviceSize.width / 1.2,
  },
  button_text: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default {
  primary: StyleSheet.create({
    ...base_style,
    button_container: {
      ...base_style.button_container,
      backgroundColor: colors.brown,
      borderWidth: 1,
      borderColor: colors.brown,
    },
    button_text: {
      ...base_style.button_text,
      color: colors.lightpink,
    },
  }),
  secondary: StyleSheet.create({
    ...base_style,

    button_container: {
      ...base_style.button_container,
      backgroundColor: colors.lightpink,
      borderWidth: 1,
      borderColor: colors.brown,
    },
    button_text: {
      ...base_style.button_text,
      color: colors.brown,
    },
  }),
};
