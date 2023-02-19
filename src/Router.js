import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FlashMessage from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import TabBarIcon from './components/TabBarIcon/TabBarIcon';

import Login from './Pages/AuthPages/Login';
import Sign from './Pages/AuthPages/Sign';

import Home from './Pages/BottomTabPages/Home';
import Social from './Pages/BottomTabPages/Social';
import Favorites from './Pages/BottomTabPages/Favorites';
import Profile from './Pages/BottomTabPages/Profile';
import BookDetail from './Pages/BookDetail/BookDetail';
import OtherUserProfile from './Pages/OtherUserProfile/OtherUserProfile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabPages = () => {
  return (
    <Tab.Navigator screenOptions={TabBarScreenOptions}>
      <Tab.Screen name="Home" component={Home} options={HomeOptions} />
      <Tab.Screen name="Social" component={Social} options={SocialOptions} />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={FavoritesOptions}
      />
      <Tab.Screen name="Profile" component={Profile} options={ProfileOptions} />
    </Tab.Navigator>
  );
};

const AuthPages = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Sign" component={Sign} />
    </Stack.Navigator>
  );
};

function Router() {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!userSession ? (
          <Stack.Screen name="AuthPages" component={AuthPages} />
        ) : (
          <Stack.Screen name="TabPages" component={TabPages} />
        )}
        <Stack.Screen
          options={BookDetailOptions}
          name="BookDetail"
          component={BookDetail}
        />
        <Stack.Screen
          options={OtherUserProfileOptions}
          name="OtherUserProfile"
          component={OtherUserProfile}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const TabBarScreenOptions = ({route}) => ({
  tabBarShowLabel: false,
  tabBarInactiveBackgroundColor: 'white',
  tabBarActiveBackgroundColor:
    route.name === 'Home'
      ? 'white'
      : route.name === 'Profile'
      ? 'white'
      : route.name === 'Settings'
      ? 'white'
      : 'white',
});

const HomeOptions = () => ({
  headerShown: false,
  tabBarLabelStyle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  tabBarIcon: ({focused}) => <TabBarIcon name="home" focused={focused} />,
});

const SocialOptions = () => ({
  headerShown: false,
  tabBarLabelStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#3d342f',
  },
  tabBarIcon: ({focused}) => (
    <TabBarIcon name="paper-plane" focused={focused} />
  ),
});

const FavoritesOptions = () => ({
  headerShown: false,
  tabBarLabelStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  tabBarIcon: ({focused}) => <TabBarIcon name="heart" focused={focused} />,
});

const ProfileOptions = () => ({
  headerShown: false,
  tabBarLabelStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#3d342f',
  },
  tabBarIcon: ({focused}) => <TabBarIcon name="user" focused={focused} />,
});

const BookDetailOptions = () => ({
  headerStyle: {
    backgroundColor: '#ffead9',
  },
  headerShown: true,
});

const OtherUserProfileOptions = () => ({
  headerStyle: {
    backgroundColor: '#ffead9',
  },
  headerTitle: 'Profile',
  headerShown: true,
});

export default Router;
