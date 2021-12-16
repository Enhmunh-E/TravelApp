import React, {useRef, useState} from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
} from 'react-native';
import Colors from '../styles/colors';
import Hamburger from '../assets/hamburger.svg';
import Close from '../assets/close.svg';
import Pin from '../assets/pin.svg';
export const Footer = () => {
  const {width} = useWindowDimensions();
  const toBigAnimation = useRef(new Animated.Value(0)).current;
  const widthValue = toBigAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [72, width - 32],
  });
  const heightValue = toBigAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [72, 160],
  });
  const hamburgerOpacity = toBigAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const [opened, setOpened] = useState(false);
  const AnimationStarter = () => {
    if (opened) {
      Animated.timing(toBigAnimation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(toBigAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
    setOpened(!opened);
  };
  return (
    <Animated.View
      style={[
        styles.circleButton,
        styles.center,
        {
          width: widthValue,
          height: heightValue,
          overflow: 'hidden',
        },
      ]}>
      <Pressable
        onPress={AnimationStarter}
        style={[
          {flex: 1, position: 'absolute', display: opened ? 'none' : 'flex'},
          styles.center,
        ]}>
        <Animated.View style={{opacity: hamburgerOpacity}}>
          <Hamburger />
        </Animated.View>
      </Pressable>
      <Animated.View
        style={[
          {
            height: 160,
            width: width - 32,
            borderRadius: 36,
            display: opened ? 'flex' : 'none',
            // backgroundColor: 'red',
          },
        ]}>
        <View
          style={{
            height: 100,
            borderBottomColor: '#2E2E2E',
            borderBottomWidth: 1,
          }}></View>
        <View style={{height: 60, flexDirection: 'row'}}>
          <View
            style={[
              {
                width: width - 96,
                borderRightColor: '#2E2E2E',
                borderRightWidth: 1,
                flexDirection: 'row',
              },
              styles.center,
            ]}>
            <Pin />
            <Text
              style={{
                color: Colors.primary,
                textTransform: 'uppercase',
                fontWeight: '600',
                paddingLeft: 14,
              }}>
              Change Cıty
            </Text>
          </View>
          <Pressable
            onPress={AnimationStarter}
            style={[styles.center, {flex: 1}]}>
            <Close />
          </Pressable>
        </View>
      </Animated.View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  circleButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.secondary,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigTop: {},
});
export default Footer;
