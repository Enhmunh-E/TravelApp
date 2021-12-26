import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapIcon from '../assets/treasure-map-line.svg';
import Star from '../assets/star-fill.svg';
import Clock from '../assets/time-line.svg';
import Colors from '../styles/colors';
interface Props {
  item: {
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
}
const windowWidth = Dimensions.get('window').width;
export const CarouselItem = ({item}: Props) => (
  <ImageBackground
    source={{uri: item.image.url}}
    resizeMode="cover"
    style={styles.imageBackground}>
    <LinearGradient
      colors={['rgba(54, 54, 54, 0)', 'rgba(0, 0, 0, 0.8)']}
      style={styles.linearStyle}
    />
    <View style={[styles.col, styles.between, styles.cover]}>
      <View style={[styles.row, styles.between]}>
        <View style={[styles.itemNameContainer, styles.center]}>
          <MapIcon />
          <Text style={styles.centraal}>centraal</Text>
        </View>
        <View style={styles.col}>
          <View>
            {/* // blurType="ultraThinMaterialDark" // blurAmount={4} */}
            {/* style={[styles.row, styles.center, styles.starContainer]}> */}
            <Star />
            <Text style={styles.rate} testID="itemRate">
              {item.rate}
            </Text>
          </View>
          <View style={[styles.closestContainer, styles.center]}>
            <Clock />
            <Text style={styles.closestText}>Closest</Text>
            <Text style={styles.closestText}>7.35pm</Text>
          </View>
        </View>
      </View>
      <Text style={styles.about}>{item.title}</Text>
    </View>
  </ImageBackground>
);
const styles = StyleSheet.create({
  imageBackground: {
    height: ((windowWidth - 32) * 213) / 327,
    width: windowWidth - 32,
    borderRadius: 10,
    padding: 16,
  },
  linearStyle: {
    position: 'absolute',
    bottom: 0,
    height: ((windowWidth - 32) * 213) / (327 * 2),
    width: windowWidth - 32,
  },
  cover: {
    flex: 1,
  },
  col: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  between: {
    justifyContent: 'space-between',
  },
  itemNameContainer: {
    width: 79,
    height: 22,
    backgroundColor: '#FFF0D8',
    borderRadius: 11,
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centraal: {
    color: '#D27C4A',
    paddingLeft: 2,
  },
  rate: {
    color: Colors.primary,
    paddingLeft: 4,
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
  about: {
    fontSize: 28,
    lineHeight: 33,
    color: Colors.primary,
    paddingBottom: 13,
  },
});
export default CarouselItem;
