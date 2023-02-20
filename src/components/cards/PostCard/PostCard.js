import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import styles from './PostCard.style';
import {compareDesc, formatDistanceToNow, parseISO} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PostCard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //It pulls and edits the data to be displayed on the post from the database, and adds the posts state.
    database()
      .ref('users/')
      .on('value', snapshot => {
        const usersData = snapshot.val();
        const posts = [];

        for (const userId in usersData) {
          const user = usersData[userId];

          if (user.shared && user.photos) {
            for (const postId in user.shared) {
              const post = user.shared[postId];
              post.name = user.profile.name;
              post.profile = {photo: user.photos.profile};
              post.userId = userId;
              post.likes = post.likes ?? 0;
              post.isLiked = false;
              post.id = postId;
              posts.push(post);
            }
          }
        }
        const sortedPosts = posts.sort((a, b) => {
          //Sets the most recently shared to be on top.
          if (a.date === b.date) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          }
          return compareDesc(new Date(a.date), new Date(b.date));
        });

        setPosts(sortedPosts);
      });
  }, []);

  const navigation = useNavigation();
  const handleUserProfile = userId => {
    navigation.navigate('OtherUserProfile', {userId: userId});
  };

  const handleLike = post => {
    //When the like button is clicked, it increases the number of likes and changes the color of the icon.
    const updatedPosts = posts.map(p => {
      if (p.id === post.id) {
        return {
          ...p,
          likes: p.likes + 1,
          isLiked: true,
        };
      }
      return p;
    });
    setPosts(updatedPosts);
    database()
      .ref(`users/${post.userId}/shared/${post.id}/likes`)
      .set(post.likes + 1);
  };

  return (
    <ScrollView style={styles.scroll_view}>
      {posts.map(post => (
        <View key={post.text} style={styles.container}>
          <View style={styles.header_container}>
            <View style={styles.header_info}>
              <TouchableOpacity onPress={() => handleUserProfile(post.userId)}>
                {post.profile.photo ? (
                  <Image
                    style={styles.profile_image}
                    source={{uri: post.profile.photo}}
                  />
                ) : (
                  <Image
                    style={styles.profile_image}
                    source={require('../../../assest/images/defaultProfile.png')}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.name_date}>
                <Text style={styles.user_name}>{post.name}</Text>
                <Text style={styles.date}>
                  {formatDistanceToNow(parseISO(post.date), {addSuffix: true})}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.likes_container}
              onPress={() => handleLike(post)}>
              <Icon
                name="thumbs-up"
                size={22}
                color={post.isLiked ? 'blue' : '#3d342f'}
              />
              <Text style={styles.likes}>{post.likes}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.message}>{post.text}</Text>
          <View style={styles.shared_image_container}>
            {post.photo && (
              <Image style={styles.shared_image} source={{uri: post.photo}} />
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default PostCard;
