import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
  BackHandler,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectYesIcon from 'react-native-vector-icons/Fontisto';
import SelectNoIcon from 'react-native-vector-icons/Fontisto';
import PushNotification from 'react-native-push-notification';
import HistoryIcon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  backgroundcolor,
  buttonbackground,
  heightsize,
  highlightcolor,
  textcolor,
  topheader,
  widthsize,
} from './Global';

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markedDates: {},
      date: '',
      time: '',
      title: '',
      showtime: false,
      showcalendar: false,
      timestamp: Date.now(),
      yesbutton: 'radio-btn-passive',
      nobutton: 'radio-btn-passive',
      getnotification: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backpress);
  }

  backpress = () => {
    this.props.navigation.goBack();
    return true;
  };

  onDayPress = (day) => {
    let markedDates = {};
    markedDates[day.dateString] = {
      startingDay: true,
      endingDay: true,
      color: highlightcolor,
      textColor: backgroundcolor,
    };
    var date = moment(day.dateString).format('DD-MM-YYYY');
    setTimeout(() => {
      this.setState({markedDates, date, timestamp: day.timestamp});
    }, 100);
  };

  notification(value) {
    if (value == 'Yes') {
      this.setState({
        yesbutton: 'radio-btn-active',
        nobutton: 'radio-btn-passive',
        getnotification: true,
      });
    } else {
      this.setState({
        nobutton: 'radio-btn-active',
        yesbutton: 'radio-btn-passive',
        getnotification: false,
      });
    }
  }

  check() {
    if (
      this.state.date == '' ||
      this.state.time == '' ||
      this.state.title == ''
    ) {
      ToastAndroid.showWithGravity(
        'Date or Time or Title are required',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      this.confirm();
    }
  }

  async confirm() {
    Keyboard.dismiss();
    var reminder = [];
    // get old data
    try {
      const value = await AsyncStorage.getItem('reminder');
      if (value !== null) {
        const data = JSON.parse(value);
        if (data.length !== 0) {
          reminder = data;
        }
      }
    } catch (error) {
      console.log(error);
    }
    // push data
    setTimeout(() => {
      reminder.push({
        date: this.state.date,
        time: this.state.time,
        title: this.state.title,
        timestamp: this.state.timestamp,
      });
    }, 100);
    // set item
    setTimeout(async () => {
      await AsyncStorage.setItem(
        'reminder',
        JSON.stringify(reminder),
        (err) => {
          if (err) {
            console.log('an error');
            throw err;
          } else {
            if (this.state.getnotification != false) {
              PushNotification.localNotificationSchedule({
                channelId: '1',
                color: highlightcolor,
                message: this.state.title,
                date: new Date(this.state.timestamp),
                allowWhileIdle: false,
              });
            }
            setTimeout(() => {
              this.setState({
                markedDates: {},
                date: '',
                time: '',
                title: '',
                showtime: false,
                showcalendar: false,
                timestamp: Date.now(),
                yesbutton: 'radio-btn-passive',
                nobutton: 'radio-btn-passive',
                getnotification: false,
              });
            }, 100);
          }
        },
      ).catch((err) => {
        console.log('error is: ' + err);
      });
    }, 100);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backpress);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.headertext}>Add Task</Text>
        </View>
        {/* calender */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          {this.state.showcalendar == true ? (
            <Calendar
              style={styles.calenderstyle}
              theme={{
                monthTextColor: highlightcolor,
                arrowColor: highlightcolor,
                textSectionTitleColor: backgroundcolor,
                todayTextColor: highlightcolor,
              }}
              minDate={Date()}
              markedDates={this.state.markedDates}
              markingType="period"
              hideExtraDays={true}
              onDayPress={this.onDayPress}
            />
          ) : (
            <View />
          )}
          {/* date */}
          <TouchableOpacity
            activeOpacity={1}
            delayPressIn={0}
            onPress={() => this.setState({showcalendar: true})}>
            <TextInput
              editable={false}
              placeholder="Select Date"
              placeholderTextColor={highlightcolor}
              value={this.state.date}
              style={styles.textinput}
            />
          </TouchableOpacity>
          {/* time */}
          <TouchableOpacity
            activeOpacity={1}
            delayPressIn={0}
            onPress={() => {
              if (this.state.date == '') {
                ToastAndroid.showWithGravity(
                  'Select Date first',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                );
              } else {
                this.setState({showtime: true});
              }
            }}>
            <TextInput
              editable={false}
              placeholder="Select Time"
              placeholderTextColor={highlightcolor}
              value={this.state.time}
              style={styles.textinput}
            />
          </TouchableOpacity>
          {/* title */}
          <TextInput
            placeholder="Add Title"
            placeholderTextColor={highlightcolor}
            value={this.state.title}
            multiline={true}
            style={styles.textinput}
            onChangeText={(text) => this.setState({title: text})}
          />
          {/* notification confirmation */}
          <TextInput
            editable={false}
            placeholder="Do you want notification for this task ?"
            placeholderTextColor={highlightcolor}
            style={[styles.textinput, {marginBottom: (heightsize * 5) / 100}]}
          />
          {/* yes or no */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginBottom: (heightsize * 5) / 100,
            }}>
            {/* yes */}
            <TouchableOpacity
              activeOpacity={0.6}
              delayPressIn={0}
              onPress={() => this.notification('Yes')}
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.yesornorow}>
                <SelectYesIcon
                  name={this.state.yesbutton}
                  size={(widthsize * 5) / 100}
                  color={highlightcolor}
                />
                <Text style={styles.yesornotext}>Yes</Text>
              </View>
            </TouchableOpacity>
            {/* no */}
            <TouchableOpacity
              activeOpacity={0.6}
              delayPressIn={0}
              onPress={() => this.notification('No')}
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.yesornorow}>
                <SelectNoIcon
                  name={this.state.nobutton}
                  size={(widthsize * 5) / 100}
                  color={highlightcolor}
                />
                <Text style={styles.yesornotext}>No</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* done */}
          <TouchableOpacity
            style={styles.button}
            delayPressIn={0}
            onPress={() => this.check()}>
            <Text style={styles.buttontext}>Confirm</Text>
          </TouchableOpacity>
          {/* footer */}
          <View style={{height: (heightsize * 15) / 100}} />
        </ScrollView>

        {/* time prompt */}
        {this.state.showtime == true ? (
          <DateTimePicker
            value={new Date(this.state.timestamp)}
            mode="time"
            is24Hour={true}
            display="clock"
            onChange={(value) => {
              this.setState({
                timestamp: value.nativeEvent.timestamp,
                showtime: false,
              });
              setTimeout(() => {
                var date = new Date(this.state.timestamp);
                var hours = String(date.getHours()).padStart(2, '0');
                var minutes = String(date.getMinutes()).padStart(2, '0');
                this.setState({time: `${hours}:${minutes}`});
              }, 100);
            }}
          />
        ) : (
          <View />
        )}
        {/* get old task icon */}
        <TouchableOpacity
          activeOpacity={0.5}
          delayPressIn={0}
          onPress={() => this.props.navigation.navigate('history')}
          style={styles.iconconainer}>
          <HistoryIcon
            name="history"
            size={(widthsize * 7) / 100}
            color={highlightcolor}
          />
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
  calenderstyle: {
    backgroundColor: topheader,
    paddingLeft: (widthsize * 3) / 100,
    paddingRight: (widthsize * 3) / 100,
    width: (widthsize * 90) / 100,
    borderRadius: (widthsize * 5) / 100,
    marginTop: (heightsize * 5) / 100,
    padding: (widthsize * 5) / 100,
  },
  textinput: {
    width: (widthsize * 90) / 100,
    marginTop: (heightsize * 5) / 100,
    backgroundColor: buttonbackground,
    padding: (widthsize * 3) / 100,
    paddingLeft: (widthsize * 5) / 100,
    borderRadius: (widthsize * 3) / 100,
    color: textcolor,
    letterSpacing: 1,
  },
  yesornorow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: buttonbackground,
    padding: (widthsize * 3) / 100,
    width: (widthsize * 20) / 100,
    borderRadius: (widthsize * 3) / 100,
  },
  yesornotext: {
    fontSize: (widthsize * 3) / 100,
    color: highlightcolor,
  },
  button: {
    width: (widthsize * 30) / 100,
    padding: (widthsize * 4) / 100,
    borderRadius: (widthsize * 3) / 100,
    backgroundColor: topheader,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttontext: {
    color: highlightcolor,
    fontSize: (widthsize * 3.5) / 100,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  iconconainer: {
    position: 'absolute',
    bottom: (heightsize * 5) / 100,
    right: (widthsize * 5) / 100,
    backgroundColor: topheader,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    padding: (widthsize * 4) / 100,
  },
});
