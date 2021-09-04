import { StatusBar } from 'expo-status-bar';
import React, {useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import middleware  from './middleware/index';
import reducer from './reducers/index';
import { setLocalNotification } from './utils/helpers';
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Decks from './components/Decks';
import Quiz from './components/Quiz';
import DeckDetail from './components/DeckDetail';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Decks') {
          iconName = focused
            ? 'md-book'
            : 'md-book-outline';
        } else if (route.name === 'Add New Deck') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        }
        
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#AA00FF',
      tabBarInactiveTintColor: 'gray',
      headerShown:false
    })}
    >
      <Tab.Screen name="Decks" component={Decks} />
      <Tab.Screen name="Add New Deck" component={AddDeck} />
    </Tab.Navigator>
  );
}
export default function App() {

  useEffect(() => {
    setLocalNotification();
  }, []);

  const store = createStore(reducer, middleware)
  return (
    <Provider store={store}>
      <View style={styles.container}>

        <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
          name="Decks"
          component={Home}
          
          options={{ headerShown: true, headerStyle:{
            backgroundColor: '#AA00FF',
            color:"#fff"
          } }}
        />
        <Stack.Screen 
          name="Deck Detail" 
          component={DeckDetail} 
          options={{ headerShown: true, headerStyle:{
            backgroundColor: '#AA00FF',
            color:"#fff"
          } }}
        />
        <Stack.Screen 
          name="Add Card" 
          component={AddCard} 
          options={{ headerShown: true, headerStyle:{
            backgroundColor: '#AA00FF',
            color:"#fff"
          } }}
        />
        <Stack.Screen 
          name="Start Quiz" 
          component={Quiz} 
          options={{ headerShown: true, headerStyle:{
            backgroundColor: '#AA00FF',
            color:"#fff"
          } }}
        />
      </Stack.Navigator>
          
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
