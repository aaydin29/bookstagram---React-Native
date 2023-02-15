import {StyleSheet} from 'react-native';
import colors from '../../styles/colors/colors';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 50,
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brown,
    bottom: 20,
    right: 20,
    paddingRight: 5,
  },
});
