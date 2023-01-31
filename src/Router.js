import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './Pages/AuthPages/Login';
import Sign from './Pages/AuthPages/Sign';

import Home from './Pages/BottomTabPages/Home';
import Social from './Pages/BottomTabPages/Social';
import Favorites from './Pages/BottomTabPages/Favorites';
import Profile from './Pages/BottomTabPages/Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabPages = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Social" component={Social} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Profile" component={Profile} />
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
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthPages" component={AuthPages} />
        <Stack.Screen name="TabPages" component={TabPages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
