import React, {useRef, useState} from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import Colors from '../styles/colors';
import Hamburger from '../assets/hamburger.svg';
import Close from '../assets/close.svg';
import Pin from '../assets/pin.svg';
import Discover from '../assets/discover.svg';
import Dos from '../assets/dos.svg';
import Dones from '../assets/dones.svg';
const width = Dimensions.get('window').width;
export const Footer = () => {
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
  const elems = [
    {
      text: 'Discover',
      image: () => <Discover />,
    },
    {
      text: "Do's",
      image: () => <Dos />,
    },
    {
      text: "Done's",
      image: () => <Dones />,
    },
    {
      text: 'Profile',
      image: () => (
        <Image
          source={require('../assets/profile.jpg')}
          style={styles.profileImage}
        />
      ),
    },
  ];
  return (
    <Animated.View
      style={[
        styles.circleButton,
        styles.center,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          width: widthValue,
          height: heightValue,
          overflow: 'hidden',
        },
      ]}>
      <Pressable
        onPress={() => !opened && AnimationStarter()}
        style={[styles.hambugerBtn, styles.center]}>
        <Animated.View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            opacity: hamburgerOpacity,
            display: opened ? 'none' : 'flex',
          }}>
          <Hamburger />
        </Animated.View>
        <Animated.View
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            {
              height: 160,
              width: width - 32,
              borderRadius: 36,
              display: opened ? 'flex' : 'none',
            },
          ]}>
          <View style={styles.top}>
            {elems.map((el, index) => (
              <View
                key={index}
                style={[styles.col, styles.topItemContainer, styles.center]}>
                {el.image}
                <Text style={styles.topItemText}>{el.text}</Text>
              </View>
            ))}
          </View>
          <View style={styles.bottom}>
            <View style={[styles.pinContainer, styles.center]}>
              <Pin />
              <Text style={styles.pinText}>Change Cıty</Text>
            </View>
            <Pressable
              onPress={AnimationStarter}
              style={[styles.center, styles.grow]}>
              <Close />
            </Pressable>
          </View>
        </Animated.View>
      </Pressable>
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
  topItemText: {
    color: Colors.primary,
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 18,
    paddingTop: 8,
  },
  topItemContainer: {
    width: 72,
    height: 80,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    borderRadius: 23,
  },
  col: {
    flexDirection: 'column',
  },
  top: {
    height: 100,
    borderBottomColor: '#2E2E2E',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  bottom: {
    height: 60,
    flexDirection: 'row',
  },
  pinContainer: {
    width: width - 96,
    borderRightColor: '#2E2E2E',
    borderRightWidth: 1,
    flexDirection: 'row',
  },
  pinText: {
    color: Colors.primary,
    textTransform: 'uppercase',
    fontWeight: '600',
    paddingLeft: 14,
  },
  grow: {
    flex: 1,
  },
  hambugerBtn: {
    flex: 1,
    width: 72,
    height: 72,
    borderRadius: 36,
    position: 'absolute',
  },
  selected: {
    backgroundColor: '#232323',
  },
});
export default Footer;
