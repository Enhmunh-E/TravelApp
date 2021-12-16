import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import LetsGo from './components/LetsGo';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {RootStackParamList} from './screens/types';
import Welcome from './screens/Welcome';
import Welcome2 from './screens/Welcome2';
import SearchIcon from './assets/search-2-line.svg';
import Colors from './styles/colors';
import Home from './screens/Home';
import HomeHeader from './components/HomeHeader';
import {Provider} from './provider/provider';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
const httpLink = createHttpLink({
  fetch,
  uri: 'https://graphql.contentful.com/content/v1/spaces/y0vql4lgwa04',
  headers: {
    Authorization: 'Bearer q9eJqpPqdgKU4wfjztDngADtDij5aFcMiY41xo-YX3c',
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {
  return (
    <View style={styles.container}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Provider>
            <Stack.Navigator>
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{
                  headerTitle: () => <LetsGo isdark={true} />,
                  headerStyle: {
                    backgroundColor: 'transparent',
                  },
                  headerTransparent: true,
                  headerShadowVisible: false,
                }}
              />
              <Stack.Screen
                name="Welcome2"
                component={Welcome2}
                options={{
                  headerTitle: () => <LetsGo isdark={false} />,
                  headerRight: () => (
                    <View style={styles.headerRightStyle}>
                      <SearchIcon />
                    </View>
                  ),
                  headerTransparent: true,
                  headerShadowVisible: false,
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  header: () => <HomeHeader />,
                }}
              />
            </Stack.Navigator>
          </Provider>
        </NavigationContainer>
      </ApolloProvider>
    </View>
  );
};
const styles = StyleSheet.create({
  headerRightStyle: {
    height: 40,
    width: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
export default App;
