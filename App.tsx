import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {
  Login,
  Welcome,
  Register,
  FoodList,
  ProductGridView,
  Settings,
} from './screens';
import UITab from './navigation/UITab';
import Navigation from './navigation/Navigation';
export default function App() {
  return (
    // <SafeAreaView>
    <Navigation />
    // </SafeAreaView>

  );
}
