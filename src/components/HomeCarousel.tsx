import React, {useCallback, useState} from 'react';
import {
  FlatList,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  NativeScrollEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  NativeSyntheticEvent,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
// import {BlurView} from '@react-native-community/blur';
import Colors from '../styles/colors';
import {Dimensions} from 'react-native';
import CarouselItem from './CarouselItem';

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
const windowWidth = Dimensions.get('window').width;
export const HomeCarousel = ({data, loading}: Props) => {
  const [imageIndex, setImageIndex] = useState(0);
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
    <View style={styles.carouselContainer}>
      {loading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <FlatList
          data={data}
          style={styles.bradius5}
          keyExtractor={item => item.sys.id}
          pagingEnabled={true}
          horizontal={true}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View testID="carouselItemId">
              <CarouselItem item={item} />
            </View>
          )}
        />
      )}
      <View style={styles.indicatorContainer}>
        {data?.map((dt, index) => (
          <View
            key={index}
            testID="dotsId"
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              {
                opacity: 1 - (0.8 / data.length) * Math.abs(imageIndex - index),
                width: imageIndex === index ? 25 : 6,
              },
              styles.indicatorStyle,
            ]}
          />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  carouselContainer: {
    height: ((windowWidth - 32) * 213) / 327,
    width: windowWidth - 32,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
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
  closestText: {
    color: Colors.primary,
    fontSize: 12,
  },
  centraal: {
    color: '#D27C4A',
    paddingLeft: 2,
  },
  rate: {
    color: Colors.primary,
    paddingLeft: 4,
  },
  activityIndicatorContainer: {
    height: ((windowWidth - 32) * 213) / 327,
    width: windowWidth - 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearStyle: {
    position: 'absolute',
    bottom: 0,
    height: ((windowWidth - 32) * 213) / (327 * 2),
    width: windowWidth - 32,
  },
  imageBackground: {
    height: ((windowWidth - 32) * 213) / 327,
    width: windowWidth - 32,
    borderRadius: 10,
    padding: 16,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 9,
    left: 16,
    flexDirection: 'row',
  },
  cover: {
    flex: 1,
  },
  bradius5: {
    borderRadius: 5,
  },
  indicatorStyle: {
    height: 6,
    backgroundColor: 'white',
    borderRadius: 6,
    margin: 5,
  },
});
export default HomeCarousel;
