import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import database from '@react-native-firebase/database';
import styles from './PostCard.style';
import parsePostData from '../../../utils/parsePostData';

const PostCard = () => {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    database()
      .ref('users/')
      .on('value', snapshot => {
        const usersData = snapshot.val();
        const posts = [];

        for (const userId in usersData) {
          const user = usersData[userId];

          if (user.shared) {
            for (const postId in user.shared) {
              const post = user.shared[postId];
              post.author = user.profile.name; // Add author's name to post data
              posts.push(post);
            }
          }
        }

        setPosts(posts);
        console.log(posts);
      });
  }, []);

  //   useEffect(() => {
  //     database()
  //       .ref('users/')
  //       .on('value', snapshot => {
  //         const contentData = snapshot.val();
  //         const parsedData = parsePostData(contentData);
  //         setUserData(parsedData);
  //         console.log(parsedData);
  //       });
  //   }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Image
          style={styles.profile_image}
          source={require('../../../assest/images/defaultProfile.png')}
        />
        {/* User profile photo */}
        <View style={styles.name_date}>
          {userData && userData.profile && userData.profile.name ? (
            <Text style={styles.user_name}>
              {userData['-ycRbzr2aq0UepD1JG0jGPGz72Io1'].profile.name}
            </Text>
          ) : (
            <Text style={styles.user_name}>UserName</Text>
          )}
          <Text style={styles.date}>date</Text>
        </View>
      </View>
      {/* {posts ? <Text style={styles.message}>{posts.text}</Text> : null} */}
      {posts.map(post => (
        <View key={post.text}>
          <Text>{post.text}</Text>
        </View>
      ))}
      <View style={styles.shared_image_container}>
        <Image
          style={styles.shared_image}
          source={require('../../../assest/images/logo.png')}
        />
        {/* User shared photo */}
      </View>
    </View>
  );
};

export default PostCard;
