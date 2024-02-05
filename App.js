import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import { registerRootComponent } from 'expo';
import Header from './src/components/Header/Header';

export default function App() {
  return (
    <>
      {/* <Header/> */}
      <AppContainer />
    </>

  );
}

