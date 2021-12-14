import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HomeCarousel from '../components/HomeCarousel';
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
  query {
    activityCollection {
      items {
        title
        rate
        category {
          name
        }
        image {
          url
        }
        sys {
          id
        }
      }
    }
  }
`;
export const Home = () => {
  const {error, data, loading} = useQuery<ActivitiesType>(ACTIVITY);
  return (
    <View style={styles.container}>
      <Text style={styles.topActivities}>Top Activities</Text>
      <HomeCarousel data={data ? data.activityCollection.items : []} />
      <Text style={styles.nearbyActivities}>Nearby activities</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
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
