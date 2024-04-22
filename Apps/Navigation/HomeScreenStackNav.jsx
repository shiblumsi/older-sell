import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/HomeScreen';
import ItemList from '../Screen/ItemList';
import ProductDetails from '../Screen/ProductDetails';


const Stack = createStackNavigator();
const HomeScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="item-list"
        component={ItemList}
        options={({ route }) => ({
          title: route.params.category,
          headerStyle: {
            backgroundColor: "#3b82f6",
          },
          headerTintColor: "#fff",
        })}
      />
      <Stack.Screen
        name="product-detail"
        component={ProductDetails}
        options={{
          headerStyle: {
            backgroundColor: "#3b82f6",
          },
          headerTintColor: "#fff",
          headerTitle:'Detail'
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStackNav