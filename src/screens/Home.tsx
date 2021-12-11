import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HomeCarousel from '../components/HomeCarousel';
import Colors from '../styles/colors';
export const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.topActivities}>Top Activities</Text>
      <HomeCarousel />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
  },
  topActivities: {
    fontSize: 19,
    lineHeight: 24,
    color: '#666462',
  },
});
export default Home;
