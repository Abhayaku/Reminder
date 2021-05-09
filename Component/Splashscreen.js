import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ReminderIcon from 'react-native-vector-icons/Ionicons';
import {widthsize, heightsize, backgroundcolor, highlightcolor} from './Global';

export default class Splashscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('namepage');
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* icon */}
        <ReminderIcon name="alarm" style={styles.icon} />
        {/* text */}
        <View style={styles.textcontainer}>
          <Text style={styles.text}> Reminder</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundcolor,
  },
  icon: {
    color: highlightcolor,
    fontSize: (widthsize * 40) / 100,
  },
  textcontainer: {
    marginTop: (heightsize * 3) / 100,
  },
  text: {
    color: highlightcolor,
    fontSize: (widthsize * 8) / 100,
    letterSpacing: 4,
  },
});
