import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import LetsGo from './components/LetsGo';
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
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      backgroundColor: Colors.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 20,
                    }}>
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
  );
};
export default App;
