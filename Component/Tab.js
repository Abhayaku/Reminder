import React, {Component} from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeIcon from 'react-native-vector-icons/MaterialIcons';
import AddIcon from 'react-native-vector-icons/Ionicons';
import HistoryIcon from 'react-native-vector-icons/FontAwesome5';
import Home from './Home';
import Add from './Add';
import Old from './Old';
import {
  widthsize,
  heightsize,
  backgroundcolor,
  buttonbackground,
  topheader,
  highlightcolor,
  textcolor,
} from './Global';

const BottomTab = createBottomTabNavigator();

export default class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BottomTab.Navigator
        backBehavior="initialRoute"
        lazy={true}
        initialRouteName="Home"
        sceneContainerStyle={{backgroundColor: backgroundcolor}}
        tabBarOptions={{
          activeBackgroundColor: topheader,
          inactiveBackgroundColor: buttonbackground,
          activeTintColor: highlightcolor,
          inactiveTintColor: textcolor,
          style: {
            height: (heightsize * 8) / 100,
          },
        }}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: ({color}) => (
              <Text
                style={{
                  fontSize: (widthsize * 3) / 100,
                  color: color,
                  paddingBottom: (heightsize * 1) / 100,
                }}>
                Home
              </Text>
            ),
            tabBarIcon: ({color}) => (
              <HomeIcon
                color={color}
                name="home"
                size={(widthsize * 6) / 100}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Add"
          component={Add}
          options={{
            tabBarLabel: ({color}) => (
              <Text
                style={{
                  fontSize: (widthsize * 3) / 100,
                  color: color,
                  paddingBottom: (heightsize * 1) / 100,
                }}>
                Add
              </Text>
            ),
            tabBarIcon: ({color}) => (
              <AddIcon
                color={color}
                name="md-add-circle"
                size={(widthsize * 6) / 100}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="History"
          component={Old}
          options={{
            tabBarLabel: ({color}) => (
              <Text
                style={{
                  fontSize: (widthsize * 3) / 100,
                  color: color,
                  paddingBottom: (heightsize * 1) / 100,
                }}>
                History
              </Text>
            ),
            tabBarIcon: ({color}) => (
              <HistoryIcon
                color={color}
                name="history"
                size={(widthsize * 6) / 100}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  }
}
