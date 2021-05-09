import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import {
  backgroundcolor,
  buttonbackground,
  heightsize,
  highlightcolor,
  textcolor,
  topheader,
  widthsize,
} from './Global';

export default class Namepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  submit() {
/*     PushNotification.createChannel({
      channelId: '1',
      channelName: 'Reminder',
    }); */
    this.props.navigation.navigate('home');
  }

  render() {
    return (
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.headertext}>Enter Detail</Text>
        </View>
        {/* textinput */}
        <TextInput
          placeholder="Enter Your Name"
          placeholderTextColor={highlightcolor}
          style={styles.textinput}
          onChangeText={(text) => this.setState({name: text})}
        />
        {/* button */}
        <TouchableOpacity
          style={styles.button}
          delayPressIn={0}
          onPress={() => this.submit()}>
          <Text style={styles.buttontext}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: backgroundcolor,
  },
  header: {
    width: widthsize,
    height: (heightsize * 10) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: topheader,
  },
  headertext: {
    color: highlightcolor,
    fontSize: (widthsize * 5) / 100,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  textinput: {
    width: (widthsize * 85) / 100,
    marginTop: (heightsize * 5) / 100,
    marginBottom: (heightsize * 5) / 100,
    backgroundColor: buttonbackground,
    padding: (widthsize * 3) / 100,
    paddingLeft: (widthsize * 5) / 100,
    borderRadius: (widthsize * 3) / 100,
    color: textcolor,
  },
  button: {
    width: (widthsize * 30) / 100,
    padding: (widthsize * 4) / 100,
    borderRadius: (widthsize * 3) / 100,
    backgroundColor: topheader,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttontext: {
    color: highlightcolor,
    fontSize: (widthsize * 3.5) / 100,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
