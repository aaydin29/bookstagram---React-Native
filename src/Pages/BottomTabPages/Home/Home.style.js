import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.lightpink,
    flex: 1,
  },
  searchBar: {
    backgroundColor: '#f5f5f5',
    // borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    margin: 10,
    marginTop: 15,
    marginBottom: 2,
    elevation: 6,
    flex: 1,
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  input_icon: {
    right: 30,
    position: 'absolute',
    bottom: 16,
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
