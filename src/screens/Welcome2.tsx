import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../styles/colors';
import styled from 'styled-components';
const Explore = styled.Pressable`
  width: 321px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 5px;
`;
export const Welcome2 = () => {
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
    <SafeAreaView style={{flex: 1}}>
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
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Image source={item.image} style={styles.listImage} />
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
                  {
                    width: index == imageIndex ? 25 : 6,
                    opacity: 1 - index / 10,
                  },
                ]}
              />
            ))}
          </View>
        </View>
        <Explore>
          <Text>EXPLORE THE CITY</Text>
        </Explore>
      </ImageBackground>
    </SafeAreaView>
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
    fontFamily: 'NoirStd-Regular',
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
    backgroundColor: 'white',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: 320,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 45,
    lineHeight: 53,
    color: Colors.secondary,
  },
});
export default Welcome2;
