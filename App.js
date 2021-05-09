import React, {Component} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splashscreen from './Component/Splashscreen';
import Namepage from './Component/Namepage';
import Tab from './Component/Tab';
import Home from './Component/Home';
import Add from './Component/Add';
import Old from './Component/Old';

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode="none"
          initialRouteName="splashscreen"
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen
            name="splashscreen"
            component={Splashscreen}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forRevealFromBottomAndroid,
            }}
          />
          <Stack.Screen name="namepage" component={Namepage} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="add" component={Add} />
          <Stack.Screen name="history" component={Old} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
