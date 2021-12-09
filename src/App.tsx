import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Animated} from 'react-native';
import {RootStackParamList} from './screens/types';
import Welcome from './screens/Welcome';
import Welcome2 from './screens/Welcome2';
const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {
  const forFade = ({current}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          // options={{ headerShown: false, cardSt}}
        />
        <Stack.Screen
          name="Welcome2"
          component={Welcome2}
          // options={{headerShown: false, cardStyleInterpolator: forFade}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
