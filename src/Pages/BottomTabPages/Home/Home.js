import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './Home.style';
import BookCard from '../../../components/cards/BookCard/BookCard';

const Psychology =
  'https://www.googleapis.com/books/v1/volumes?q=subject:psychology&maxResults=20&key=AIzaSyCwKBtsbYyjTxHZkxgAI5tgFRLOrvd2WLk';
const Political =
  'https://www.googleapis.com/books/v1/volumes?q=subject:political&maxResults=20&key=AIzaSyCwKBtsbYyjTxHZkxgAI5tgFRLOrvd2WLk';
const Philosophy =
  'https://www.googleapis.com/books/v1/volumes?q=subject:philosophy&maxResults=20&key=AIzaSyCwKBtsbYyjTxHZkxgAI5tgFRLOrvd2WLk';
const History =
  'https://www.googleapis.com/books/v1/volumes?q=subject:history&maxResults=20&key=AIzaSyCwKBtsbYyjTxHZkxgAI5tgFRLOrvd2WLk';

const Home = ({navigation}) => {
  const [psychologyData, setPsychologyData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [politicalData, setPoliticalData] = useState([]);
  const [philosophyData, setPhilosophyData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //It pulls the book data from the API and adding it to the states.
    async function fetchdata() {
      await axios.get(Political).then(response => {
        setPoliticalData(response.data.items);
      });
      await axios.get(Philosophy).then(response => {
        setPhilosophyData(response.data.items);
      });
      await axios.get(History).then(response => {
        setHistoryData(response.data.items);
      });
      await axios.get(Psychology).then(response => {
        setPsychologyData(response.data.items);
      });
      setLoading(false);
    }
    fetchdata();
  }, []);

  const handleBookSelect = item => {
    //Goes to the detail page of the selected book.
    navigation.navigate('BookDetail', {item});
  };

  const renderBooks = ({item}) => {
    // If something is entered in the search bar and the title of the book does not contain this text, this book will not be rendered.
    if (
      searchText &&
      !item.volumeInfo.title.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return null;
    }
    return (
      <BookCard
        volumeInfo={item.volumeInfo}
        onSelect={() => handleBookSelect(item)}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.input_container}>
        <TextInput
          style={styles.searchBar}
          onChangeText={text => setSearchText(text)}
          value={searchText}
          placeholder="Search books..."
        />
        <Icon
          style={styles.input_icon}
          name="search"
          size={20}
          color="#9e9e9e"
        />
      </View>
      {searchText.length > 0 ? null : (
        <Text style={styles.headers}>Psychology</Text>
      )}
      <View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            horizontal
            data={psychologyData}
            renderItem={renderBooks}
            keyExtractor={item => item.id}
          />
        )}
      </View>
      {searchText.length > 0 ? null : (
        <Text style={styles.headers}>History</Text>
      )}
      <View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            horizontal
            data={historyData}
            renderItem={renderBooks}
            keyExtractor={item => item.id}
          />
        )}
      </View>
      {searchText.length > 0 ? null : (
        <Text style={styles.headers}>Philosophy</Text>
      )}
      <View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            horizontal
            data={philosophyData}
            renderItem={renderBooks}
            keyExtractor={item => item.id}
          />
        )}
      </View>
      {searchText.length > 0 ? null : (
        <Text style={styles.headers}>Political</Text>
      )}
      <View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            horizontal
            data={politicalData}
            renderItem={renderBooks}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Home;
