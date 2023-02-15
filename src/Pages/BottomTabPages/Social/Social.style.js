import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightpink,
  },
  header_container: {
    backgroundColor: colors.brown,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header_icon: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: -135,
  },
  header_title: {
    fontSize: 20,
    color: 'white',
    marginTop: 7,
  },
  header_image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
