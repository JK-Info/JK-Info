import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreenGestao from './HomeScreenGestao';
import UserPostsGestao from './UserPostsGestao';

const Stack = createNativeStackNavigator();

const GestaoNavigator = () => {
  const [posts, setPosts] = useState([]);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreenGestao"
        options={{ headerShown: false }}>
        {() => <HomeScreenGestao onPostCreated={handlePostCreated} />}
      </Stack.Screen>
      <Stack.Screen
        name="UserPostsGestao"
        options={{ headerShown: false }}>
        {() => <UserPostsGestao posts={posts} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default GestaoNavigator;
