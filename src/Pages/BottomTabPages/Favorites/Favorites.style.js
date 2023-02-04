import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightpink,
  },
  header: {
    textAlign: 'center',
    backgroundColor: colors.brown,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  ifMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
  },
});
