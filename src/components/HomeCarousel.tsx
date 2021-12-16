import React, {useCallback, useContext, useMemo, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import MapIcon from '../assets/treasure-map-line.svg';
import Colors from '../styles/colors';
import Star from '../assets/star-fill.svg';
import Clock from '../assets/time-line.svg';
import {Context} from '../provider/provider';

type ActivityType = {
  title: string;
  rate: number;
  category: {
    name: string;
  };
  image: {
    url: string;
  };
  sys: {
    id: string;
  };
};

type Props = {
  data: ActivityType[];
  loading: boolean;
};
export const HomeCarousel = ({data, loading}: Props) => {
  const [imageIndex, setImageIndex] = useState(0);
  const {width} = useWindowDimensions();
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
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
      }}>
      {loading ? (
        <View
          style={{
            height: ((width - 48) * 213) / 327,
            width: width - 48,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <FlatList
          data={data}
          style={{
            borderRadius: 5,
          }}
          keyExtractor={item => item.sys.id}
          pagingEnabled={true}
          horizontal={true}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <ImageBackground
              source={{uri: item.image.url}}
              resizeMode="cover"
              style={{
                height: ((width - 48) * 213) / 327,
                width: width - 48,
                borderRadius: 10,
                padding: 16,
              }}>
              <LinearGradient
                colors={['rgba(54, 54, 54, 0)', 'rgba(0, 0, 0, 0.8)']}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  height: ((width - 48) * 213) / (327 * 2),
                  width: width - 48,
                }}></LinearGradient>
              <View style={[styles.col, styles.between, {flex: 1}]}>
                <View style={[styles.row, styles.between]}>
                  <View style={[styles.itemNameContainer, styles.center]}>
                    <MapIcon />
                    <Text style={{color: '#D27C4A', paddingLeft: 2}}>
                      centraal
                    </Text>
                  </View>
                  <View style={styles.col}>
                    <BlurView
                      blurType="ultraThinMaterialDark"
                      blurAmount={4}
                      style={[styles.row, styles.center, styles.starContainer]}>
                      <Star />
                      <Text style={{color: Colors.primary, paddingLeft: 4}}>
                        {item.rate}
                      </Text>
                    </BlurView>
                    <View style={[styles.closestContainer, styles.center]}>
                      <Clock />
                      <Text style={{color: Colors.primary, fontSize: 12}}>
                        Closest
                      </Text>
                      <Text style={{color: Colors.primary, fontSize: 12}}>
                        7.35pm
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.about}>{item.title}</Text>
              </View>
            </ImageBackground>
          )}
        />
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 9,
          left: 16,
          display: 'flex',
          flexDirection: 'row',
        }}>
        {data?.map((dt, index) => (
          <View
            key={index}
            style={{
              opacity: 1 - (0.8 / data.length) * Math.abs(imageIndex - index),
              width: imageIndex == index ? 25 : 6,
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
const styles = StyleSheet.create({
  itemNameContainer: {
    width: 79,
    height: 22,
    backgroundColor: '#FFF0D8',
    borderRadius: 11,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  about: {
    fontSize: 28,
    lineHeight: 33,
    color: Colors.primary,
    paddingBottom: 13,
  },
  between: {
    justifyContent: 'space-between',
  },
  starContainer: {
    width: 56,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 12,
  },
  closestContainer: {
    width: 56,
    height: 62,
    backgroundColor: Colors.secondary,
    marginTop: 8,
    borderRadius: 7,
  },
});
export default HomeCarousel;
