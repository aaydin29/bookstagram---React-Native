import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import axios from 'axios';

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

  useEffect(() => {
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
    }
    fetchdata();
  }, []);

  const handleBookSelect = item => {
    navigation.navigate('BookDetail', {item});
  };

  const renderBooks = ({item}) => (
    <BookCard
      volumeInfo={item.volumeInfo}
      onSelect={() => handleBookSelect(item)}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headers}>Psychology</Text>
      <View>
        <FlatList
          horizontal
          data={psychologyData}
          renderItem={renderBooks}
          keyExtractor={item => item.id}
        />
      </View>
      <Text style={styles.headers}>History</Text>
      <View>
        <FlatList
          horizontal
          data={historyData}
          renderItem={renderBooks}
          keyExtractor={item => item.id}
        />
      </View>
      <Text style={styles.headers}>Philosophy</Text>
      <View>
        <FlatList
          horizontal
          data={philosophyData}
          renderItem={renderBooks}
          keyExtractor={item => item.id}
        />
      </View>
      <Text style={styles.headers}>Political</Text>
      <View>
        <FlatList
          horizontal
          data={politicalData}
          renderItem={renderBooks}
          keyExtractor={item => item.id}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
