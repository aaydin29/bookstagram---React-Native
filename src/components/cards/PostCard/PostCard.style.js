import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors/colors';

export default StyleSheet.create({
  container: {
    // borderWidth: 1,
    borderRadius: 7,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    elevation: 10,
  },
  header_container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  profile_image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  user_name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.brown,
  },
  date: {},
  name_date: {
    marginLeft: 10,
  },
  message: {
    marginVertical: 10,
    color: colors.brown,
  },
  shared_image_container: {
    alignItems: 'center',
    marginBottom: 5,
  },
  shared_image: {
    width: 100,
    height: 150,
    borderRadius: 7,
    marginLeft: 10,
    marginTop: 10,
    alignContent: 'center',
  },
});
