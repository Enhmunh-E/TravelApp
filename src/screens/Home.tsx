import {gql, useQuery} from '@apollo/client';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Footer from '../components/Footer';
import HomeCarousel from '../components/HomeCarousel';
import {ACTIVITY_PLACE_FIELDS} from '../fragments';
import {Context} from '../provider/provider';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Colors from '../styles/colors';
import NearbyItem from '../components/NearbyItem';
import LinearGradient from 'react-native-linear-gradient';
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
request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log(
        'This feature is not available (on this device / in this context)',
      );
      break;
    case RESULTS.DENIED:
      console.log(
        'The permission has not been requested / is denied but requestable',
      );
      break;
    case RESULTS.LIMITED:
      console.log('The permission is limited: some actions are possible');
      break;
    case RESULTS.GRANTED:
      console.log('The permission is granted');
      break;
    case RESULTS.BLOCKED:
      console.log('The permission is denied and not requestable anymore');
      break;
  }
});
export const Home = () => {
  const {data, loading} = useQuery<ActivitiesType>(ACTIVITY);
  const [location, setLocation] = useState<LocationType | null>(null);
  const {headerSelected, filteredData} = useContext(Context);
  const nearbyPlaces = useMemo(() => {
    return data?.activityCollection.items.filter(dt => {
      return (
        Number(dt.location.lat.toFixed(1)) === location?.lat &&
        Number(dt.location.lon.toFixed(1)) === location?.lon
      );
    });
  }, [data, location]);
  useEffect(() => {
    let watchID = 0;
    const subscribeLocationLocation = () => {
      watchID = Geolocation.watchPosition(
        position => {
          setLocation({
            lat: Number(position.coords.latitude.toFixed(1)),
            lon: Number(position.coords.longitude.toFixed(1)),
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
      {/* gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0.783389) 53.2%,
      rgba(255, 255, 255, 0.341442) 85.16%, rgba(255, 255, 255, 0) 100%); */}
      <LinearGradient colors={['rgba(54, 54, 54, 0)', 'rgba(0, 0, 0, 0.8)']} />
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
