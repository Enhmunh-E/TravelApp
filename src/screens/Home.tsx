import {gql, useQuery} from '@apollo/client';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import Footer from '../components/Footer';
import HomeCarousel from '../components/HomeCarousel';
import {ACTIVITY_PLACE_FIELDS} from '../fragments';
import {Context} from '../provider/provider';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Colors from '../styles/colors';
import NearbyItem from '../components/NearbyItem';
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
  location: {
    lat: number;
    lon: number;
  };
};
type ActivitiesType = {
  activityCollection: {
    items: ActivityType[];
  };
};
type LocationType = {
  lat: number;
  lon: number;
};
const ACTIVITY = gql`
  ${ACTIVITY_PLACE_FIELDS}
  query {
    activityCollection {
      items {
        ...ActivityPlaceFields
      }
    }
  }
`;
request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
export const Home = () => {
  const {data, loading} = useQuery<ActivitiesType>(ACTIVITY);
  const [location, setLocation] = useState<LocationType | null>(null);
  const {headerSelected, filteredData} = useContext(Context);
  const nearbyPlaces = useMemo(() => {
    return data?.activityCollection.items.filter(
      data =>
        Number(data.location.lat.toFixed(3)) == location?.lat &&
        Number(data.location.lon.toFixed(3)) == location.lon,
    );
  }, [data, location]);

  useEffect(() => {
    let watchID = 0;
    const subscribeLocationLocation = () => {
      watchID = Geolocation.watchPosition(
        position => {
          setLocation({
            lat: Number(position.coords.latitude.toFixed(3)),
            lon: Number(position.coords.longitude.toFixed(3)),
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true},
      );
    };
    subscribeLocationLocation();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.topActivities}>Top Activities</Text>
        <HomeCarousel
          data={
            headerSelected === 'All'
              ? data?.activityCollection.items
                ? data.activityCollection.items
                : []
              : filteredData
              ? filteredData.activityCollection.items
              : []
          }
          loading={loading}
        />
        <Text style={styles.nearbyActivities}>Nearby activities</Text>
        {nearbyPlaces?.map((place, index) => (
          <NearbyItem data={place} key={index} />
        ))}
      </ScrollView>
      <Footer />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  topActivities: {
    fontSize: 19,
    lineHeight: 24,
    color: '#666462',
  },
  nearbyActivities: {
    fontSize: 19,
    lineHeight: 24,
    color: '#666462',
    marginTop: 32,
    marginBottom: 12,
  },
  scroll: {
    paddingHorizontal: 16,
  },
});
export default Home;
