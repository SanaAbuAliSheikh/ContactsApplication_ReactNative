import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ContactScreen from '../Screen/Contacts';
import SelectedListOfContacts from '../Screen/SelectedListOfContacts';
import ChatScreen from '../Screen/Chat';

function AppStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen name="Contacts" component={ContactScreen} />
      <Stack.Screen
        name="Selected Contacts"
        component={SelectedListOfContacts}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
