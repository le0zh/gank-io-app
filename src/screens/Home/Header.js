import React from 'react';
import { View, StyleSheet, Text, Image, TouchableNativeFeedback } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { px2dp, SCREEN_WIDTH } from '../../utils';
import { get } from '../../data';

export default class Header extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      ready: false,
      date: '',
      imageUrl: '',
    };
  }

  componentDidMount() {
    get('http://gank.io/api/day/history').then(res1 => {
      const latest = res1.results[0].replaceAll('-', '/');

      get(`http://gank.io/api/day/${latest}`).then(res => {
        this.setState({
          ready: true,
          date: res1.results[0],
          imageUrl: res.results['福利'][0].url,
        });
      });
    });
  }

  // componentDidMount() {
  //   get('http://gank.io/api/random/data/福利/1').then(res => {
  //     this.setState({
  //       imageUrl: res.results[0].url,
  //     });
  //   });
  // }

  _onImagePress = () => {
    Navigation.showModal({
      screen: 'app.Fuli.FullScreenViewer', // unique ID registered with Navigation.registerScreen
      title: 'Modal', // title of the screen as appears in the nav bar (optional)
      passProps: { url: this.state.imageUrl }, // simple serializable object that will pass as props to the modal (optional)
      navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      animationType: 'slide-up', // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });
  };

  render() {
    if (!this.state.ready) {
      return null;
    }

    return (
      <TouchableNativeFeedback onPress={() => this._onImagePress()}>
        <View style={styles.wrapper}>
          <Image style={styles.img} source={{ uri: this.state.imageUrl }} />
          <View style={styles.mask}>
            <Text style={styles.date}>{this.state.date}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 300,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  img: {
    width: SCREEN_WIDTH,
    height: 300,
    resizeMode: 'cover',
  },

  mask: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
    backgroundColor: '#00000066',
  },

  date: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: px2dp(38),
  },

  title: {
    color: '#fff',
  },
});
