import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  backgroundcolor,
  buttonbackground,
  heightsize,
  highlightcolor,
  textcolor,
  topheader,
  widthsize,
} from './Global';

export default class Old extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: [],
      noreminder: false,
      refreshing: false,
    };
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('reminder');
      if (value !== null) {
        const data = JSON.parse(value);
        if (data.length !== 0) {
          this.setState({reminder: data, refreshing: false});
        } else {
          this.setState({noreminder: true});
        }
      } else {
        this.setState({noreminder: true});
      }
    } catch (error) {
      console.log(error);
    }
  }

  delete = (index) => {
    var reminder = [];
    reminder = this.state.reminder;
    reminder.splice(index, 1);
    setTimeout(() => {
      this.setState({reminder: reminder});
    }, 100);
    setTimeout(async () => {
      await AsyncStorage.setItem(
        'reminder',
        JSON.stringify(this.state.reminder),
        (err) => {
          if (err) {
            console.log('an error');
            throw err;
          } else {
            ToastAndroid.showWithGravity(
              'Deleted Successfully',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
        },
      ).catch((err) => {
        console.log('error is: ' + err);
      });
    }, 100);
  };

  onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.componentDidMount();
    }, 1500);
  };

  render() {
    return (
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.headertext}>History</Text>
        </View>
        {/* list */}
        {this.state.noreminder == false ? (
          <FlatList
            data={this.state.reminder}
            style={{flex: 1}}
            refreshControl={
              <RefreshControl
                colors={[highlightcolor, topheader]}
                progressBackgroundColor={backgroundcolor}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            renderItem={({item, index}) => (
              <View>
                <View style={styles.flatlistrow}>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        styles.flatlisttext,
                        {fontSize: (widthsize * 4) / 100, color: textcolor},
                      ]}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={styles.flatlistcolumn}>
                    <View>
                      <Text style={styles.flatlisttext}>{item.date}</Text>
                    </View>
                    <View>
                      <Text style={[styles.flatlisttext, {color: textcolor}]}>
                        {item.time}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    delayPressIn={0}
                    activeOpacity={0.6}
                    onPress={() => this.delete(index)}>
                    <DeleteIcon name="delete" style={styles.flatlisticon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.timestamp.toString()}
            ListFooterComponent={() => {
              return <View style={{height: (heightsize * 3) / 100}} />;
            }}
          />
        ) : (
          <View style={[styles.container, {justifyContent: 'center'}]}>
            <Text style={[styles.flatlisttext, {color: textcolor}]}>
              There is nothing to show. You have not add any reminder.
            </Text>
          </View>
        )}
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
  flatlistrow: {
    width: (widthsize * 95) / 100,
    marginTop: (heightsize * 3) / 100,
    padding: (widthsize * 6) / 100,
    borderRadius: (widthsize * 5) / 100,
    backgroundColor: buttonbackground,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatlistcolumn: {
    justifyContent: 'space-between',
    height: (heightsize * 6) / 100,
    marginLeft: (widthsize * 1) / 100,
  },
  flatlisttext: {
    fontSize: (widthsize * 3.5) / 100,
    color: highlightcolor,
  },
  flatlisticon: {
    marginLeft: (widthsize * 5) / 100,
    color: highlightcolor,
    fontSize: (widthsize * 6) / 100,
  },
});
