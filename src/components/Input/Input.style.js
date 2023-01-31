import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../styles/colors/colors';

const deviseSize = Dimensions.get('window');

export default StyleSheet.create({
  input_container: {
    borderBottomWidth: 1,
    borderColor: colors.brown,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: deviseSize.width / 1.2,
    paddingHorizontal: 5,
    paddingRight: 10,
  },
  input_text: {
    fontSize: 14,
  },
});
