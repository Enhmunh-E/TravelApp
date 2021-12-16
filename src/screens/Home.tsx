import {gql, useQuery} from '@apollo/client';
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Footer from '../components/Footer';
import HomeCarousel from '../components/HomeCarousel';
import {ACTIVITY_PLACE_FIELDS} from '../fragments';
import {Context} from '../provider/provider';
import Colors from '../styles/colors';
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
type ActivitiesType = {
  activityCollection: {
    items: ActivityType[];
  };
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

export const Home = () => {
  const {data, loading} = useQuery<ActivitiesType>(ACTIVITY);
  const {headerSelected, filteredData} = useContext(Context);
  return (
    <View style={styles.container}>
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
      <Footer />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
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
});
export default Home;
