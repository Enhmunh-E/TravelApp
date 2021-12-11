import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Pressable,
  Dimensions,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Explore from '../assets/explore.svg';
import LetsGo from '../components/LetsGo';
import Colors from '../styles/colors';
import {RootStackParamList} from './types';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
export const Welcome = ({navigation}: Props) => {
  return (
    <ImageBackground
      source={require('../assets/homeImage.png')}
      resizeMode="cover"
      style={styles.bgImage}>
      <Text style={styles.hello}>Hello,</Text>
      <Text style={styles.leonard}>Leonard!</Text>
      <Pressable
        style={styles.explore}
        onPress={() => navigation.navigate('Welcome2')}>
        <Explore />
      </Pressable>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    paddingTop: 100,
  },
  explore: {
    width: 339,
    height: 74,
    position: 'absolute',
    right: (windowWidth - 339) / 2,
    bottom: 50,
  },
  hello: {
    color: Colors.green,
    fontSize: 45,
    lineHeight: 52,
    paddingLeft: 27,
    fontFamily: 'Cochin',
  },
  leonard: {
    color: Colors.secondary,
    fontSize: 45,
    lineHeight: 52,
    paddingLeft: 27,
    fontFamily: 'Cochin',
  },
});
export default Welcome;
