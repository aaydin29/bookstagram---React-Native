import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../styles/colors/colors';

const deviseSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.lightpink,
    flex: 1,
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: 'white',
    marginTop: 15,
    marginHorizontal: 10,
  },
  input_icon: {
    marginRight: 10,
  },
  input: {
    padding: 5,
    paddingLeft: 10,
    flex: 1,
  },
  page_header: {
    backgroundColor: colors.brown,
    color: colors.lightpink,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headers: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.brown,
    marginVertical: 10,
    borderBottomWidth: 2,
    paddingBottom: 5,
    textAlign: 'center',
  },
});
