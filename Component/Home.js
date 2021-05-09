import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  RefreshControl,
  FlatList,
} from 'react-native';
import PlusIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  backgroundcolor,
  heightsize,
  highlightcolor,
  topheader,
  widthsize,
  buttonbackground,
  textcolor,
} from './Global';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: '',
      task: [],
      notask: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    setTimeout(() => {
      this.setState({today: `${day}-${month}-${year}`});
      this.gettask();
    }, 50);
    BackHandler.addEventListener('hardwareBackPress', this.backpress);
  }

  async gettask() {
    try {
      const value = await AsyncStorage.getItem('reminder');
      if (value !== null) {
        const data = JSON.parse(value);
        if (data.length !== 0) {
          this.setState({task: data, refreshing: false});
          setTimeout(() => {
            this.filter();
          }, 50);
        } else {
          this.setState({notask: true, refreshing: false});
        }
      } else {
        this.setState({notask: true, refreshing: false});
      }
    } catch (error) {
      console.log(error);
    }
  }

  filter() {
    /*  var today = this.state.today;
    var taskdata = this.state.task.filter(function (data) {
      return data.date == today;
    });
    setTimeout(() => {
      this.setState({task: taskdata});
    }, 50); */
  }

  backpress = () => {
    BackHandler.exitApp();
    return true;
  };

  onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.componentDidMount();
    }, 1500);
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backpress);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.headertext}>Home</Text>
        </View>

        {/* list */}
        {this.state.notask == false ? (
          <FlatList
            data={this.state.task}
            style={{flex: 1}}
            refreshControl={
              <RefreshControl
                colors={[highlightcolor, topheader]}
                progressBackgroundColor={backgroundcolor}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            renderItem={({item}) => (
              <View style={{flex: 1, alignItems: 'center'}}>
                <View
                  style={{
                    marginTop: (heightsize * 5) / 100,
                    width: (widthsize * 71) / 100,
                    height: (heightsize * 30) / 100,
                    backgroundColor: topheader,
                    borderRadius: (widthsize * 5) / 100,
                  }}>
                  <View
                    style={{
                      padding: (widthsize * 5) / 100,
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      backgroundColor: backgroundcolor,
                      borderRadius: (widthsize * 5) / 100,
                      borderWidth: 1,
                      borderColor: topheader,
                      flexDirection: 'row',
                    }}>
                    <Text>Today's Date</Text>
                    <Text>{item.date}</Text>
                  </View>
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

        {/* add new task icon */}
        <TouchableOpacity
          activeOpacity={0.5}
          delayPressIn={0}
          onPress={() => this.props.navigation.navigate('add')}
          style={styles.iconconainer}>
          <PlusIcon
            name="plus"
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
