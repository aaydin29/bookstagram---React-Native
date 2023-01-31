import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../styles/colors/colors';

const deviseSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightpink,
  },
  image_container: {
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
  },
  login_container: {
    alignItems: 'center',
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: deviseSize.width / 1.2,
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
});
