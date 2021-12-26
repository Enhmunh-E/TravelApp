import React from 'react';
import TimePointer from '../assets/timepointer.svg';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  Text,
} from 'react-native';
type Props = {
  data: {
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
    location: {
      lat: number;
      lon: number;
    };
  };
};
const width = Dimensions.get('window').width;
export const NearbyItem = ({data}: Props) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.bgContainer}>
        <ImageBackground source={{uri: data.image.url}} style={styles.bg} />
      </View>
      <Text style={styles.title}>{data.title}</Text>
      <View style={[styles.row, styles.alignCenter]}>
        <TimePointer />
        <Text style={styles.min}>10 min</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    width: width - 32,
    flexDirection: 'column',
    borderRadius: 5,
    overflow: 'hidden',
  },
  bg: {
    width: width - 32,
    height: 180,
  },
  title: {
    fontSize: 14,
    lineHeight: 27,
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  min: {
    color: '#5B7D76',
    fontSize: 11,
    lineHeight: 16,
  },
  bgContainer: {
    borderRadius: 5,
    overflow: 'hidden',
  },
});
export default NearbyItem;
