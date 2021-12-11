import React, {useCallback, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export const HomeCarousel = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const {width} = useWindowDimensions();
  const data1 = [
    {
      id: 1,
      name: 'centraal',
      about: 'Taking a boat tour through Canals',
      star: 4.1,
      closest: '7.35pm',
      image: require('../assets/centraal.png'),
    },
    {
      id: 2,
      name: 'centraal',
      about: 'Taking a boat tour through Canals',
      star: 4.1,
      closest: '7.35pm',
      image: require('../assets/centraal.png'),
    },
    {
      id: 3,
      name: 'centraal',
      about: 'Taking a boat tour through Canals',
      star: 4.1,
      closest: '7.35pm',
      image: require('../assets/centraal.png'),
    },
    {
      id: 4,
      name: 'centraal',
      about: 'Taking a boat tour through Canals',
      star: 4.1,
      closest: '7.35pm',
      image: require('../assets/centraal.png'),
    },
    {
      id: 5,
      name: 'centraal',
      about: 'Taking a boat tour through Canals',
      star: 4.1,
      closest: '7.35pm',
      image: require('../assets/centraal.png'),
    },
    {
      id: 6,
      name: 'centraal',
      about: 'Taking a boat tour through Canals',
      star: 4.1,
      closest: '7.35pm',
      image: require('../assets/centraal.png'),
    },
    {
      id: 7,
      name: 'centraal',
      about: 'Taking a boat tour through Canals',
      star: 4.1,
      closest: '7.35pm',
      image: require('../assets/centraal.png'),
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
    <View
      style={{
        height: ((width - 48) * 213) / 327,
        width: width - 48,
      }}>
      <FlatList
        data={data1}
        style={{
          borderRadius: 5,
        }}
        keyExtractor={item => '' + item.id}
        pagingEnabled={true}
        horizontal={true}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <ImageBackground
            source={item.image}
            resizeMode="repeat"
            style={{
              height: ((width - 48) * 213) / 327,
              width: width - 48,
              borderRadius: 10,
            }}>
            <LinearGradient
              colors={['rgba(54, 54, 54, 0)', 'rgba(0, 0, 0, 0.8)']}
              style={{
                position: 'absolute',
                bottom: 0,
                height: ((width - 48) * 213) / (327 * 2),
                width: width - 48,
              }}></LinearGradient>
          </ImageBackground>
        )}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 9,
          left: 16,
          display: 'flex',
          flexDirection: 'row',
        }}>
        {data1.map((dt, index) => (
          <View
            style={{
              width: 6,
              height: 6,
              backgroundColor: 'white',
              borderRadius: 6,
              margin: 5,
            }}></View>
        ))}
      </View>
    </View>
  );
};
export default HomeCarousel;
