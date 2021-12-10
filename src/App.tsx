import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import LetsGo from './components/LetsGo';
import {RootStackParamList} from './screens/types';
import Welcome from './screens/Welcome';
import Welcome2 from './screens/Welcome2';
import SearchIcon from './assets/search-2-line.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from './styles/colors';
const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {
  return (
    <NavigationContainer>
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
                  marginTop: 35,
                }}>
                <SearchIcon />
              </View>
            ),
            headerTransparent: true,
            headerShadowVisible: false,
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
