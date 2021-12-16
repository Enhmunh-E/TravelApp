import React, {useCallback, useContext, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  NativeScrollEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../styles/colors';
// import {BlurView} from '@react-native-community/blur';
import {Context} from '../provider/provider';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {NativeStackScreenProps} from '@react-navigation/native-stack';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {RootStackParamList} from './types';
type Props = NativeStackScreenProps<RootStackParamList, 'Welcome2'>;
export const Welcome2 = ({navigation}: Props) => {
  const {setHeaderText} = useContext(Context);
  const [imageIndex, setImageIndex] = useState(0);
  const data = [
    {
      name: 'London',
      image: require('../assets/london.png'),
    },
    {
      name: 'Amsterdam',
      image: require('../assets/amsterdam.png'),
    },
    {
      name: 'Lucerne',
      image: require('../assets/lucerne.jpg'),
    },
    {
      name: 'New York',
      image: require('../assets/newyork.jpg'),
    },
  ];
  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const index = event.nativeEvent.contentOffset.x / slideSize;
      const roundIndex = Math.round(index);
      setImageIndex(roundIndex);
    },
    [],
  );
  return (
    <ImageBackground
      blurRadius={1}
      source={data[imageIndex].image}
      style={styles.bgImage}>
      <Text style={styles.title}>Choose Your City</Text>
      <View style={styles.center}>
        <View style={[styles.centerRectangle, styles.center]}>
          <FlatList
            data={data}
            keyExtractor={item => item.name}
            pagingEnabled={true}
            horizontal={true}
            onScroll={onScroll}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.col}>
                <Image
                  source={item.image}
                  style={styles.listImage}
                  // resizeMode="c"
                  resizeMethod="scale"
                />
                <Text style={styles.cityName}>{item.name}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.centerBottom}>
          {data.map((dt, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  width: index === imageIndex ? 25 : 6,
                  opacity: 1 - (1 / data.length) * Math.abs(imageIndex - index),
                },
              ]}
            />
          ))}
        </View>
      </View>
      <Pressable
        onPress={() => {
          setHeaderText(data[imageIndex].name);
          navigation.navigate('Home');
        }}>
        {/* <BlurView blurType="light" blurAmount={100} style={styles.explore} /> */}
        <Text style={styles.exploreText}>EXPLORE THE CITY</Text>
      </Pressable>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  centerRectangle: {
    width: 320,
    height: 450,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  centerBottom: {
    backgroundColor: 'white',
    width: 138,
    height: 20,
    borderRadius: 10,
    marginTop: -10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingHorizontal: 19,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listImage: {
    width: 300,
    height: 380,
    margin: 10,
    borderRadius: 10,
  },
  indicator: {
    width: 6,
    height: 6,
    backgroundColor: Colors.green,
    borderRadius: 3,
  },
  cityName: {
    // fontFamily: 'NoirStd-Regular',
    textTransform: 'uppercase',
    color: Colors.secondary,
    fontSize: 24,
    lineHeight: 27,
    textAlign: 'center',
    marginTop: 10,
  },
  explore: {
    width: 320,
    height: 64,
    borderRadius: 5,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Times New Roman',
    width: 320,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 45,
    lineHeight: 53,
    color: Colors.secondary,
  },
  exploreText: {
    color: Colors.primary,
    fontSize: 16,
    lineHeight: 27,
    letterSpacing: 0.1,
  },
  col: {
    flexDirection: 'column',
  },
});
export default Welcome2;
