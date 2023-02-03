import {StyleSheet} from 'react-native';
import colors from '../../styles/colors/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightpink,
  },
  top_container: {
    backgroundColor: colors.brown,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 7,
    margin: 5,
    padding: 5,
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 7,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  info_container: {
    flex: 1,
    marginVertical: 17,
    marginHorizontal: 10,
  },
  book_name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    borderBottomWidth: 1,
    borderColor: 'white',
    paddingBottom: 5,
    marginRight: 20,
  },
  authors: {
    marginVertical: 20,
  },
  text: {
    color: 'white',
  },
  categories: {},
  info_titles: {
    color: 'white',
    fontWeight: 'bold',
  },
  icon_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
    marginVertical: 1,
    borderRadius: 7,
    backgroundColor: colors.brown,
  },
  icon1: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 2,
    borderColor: colors.lightpink,
    margin: 4,
    padding: 7,
  },
  icon2: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    margin: 4,
    padding: 7,
  },
  desc_container: {
    backgroundColor: colors.brown,
    borderWidth: 1,
    borderRadius: 7,
    margin: 5,
    padding: 10,
    alignItems: 'center',
  },
  desc_title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    padding: 5,
    paddingBottom: 8,
    paddingHorizontal: 133,
  },
  desc_text: {
    color: 'white',
    textAlign: 'center',
  },
});
