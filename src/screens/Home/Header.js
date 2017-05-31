import React from 'react';
import { View, StyleSheet, Text, Image, TouchableNativeFeedback } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { SCREEN_WIDTH } from '../../utils';
import { get } from '../../data';

export default class Header extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      imageUrl: '',
    };
  }

  componentDidMount() {
    get('http://gank.io/api/random/data/福利/1').then(res => {
      this.setState({
        imageUrl: res.results[0].url,
      });
    });
  }

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
    if (this.state.imageUrl === '') {
      return null;
    }

    return (
      <View style={styles.wrapper}>
        <TouchableNativeFeedback onPress={() => this._onImagePress()}>
          <Image style={styles.img} source={{ uri: this.state.imageUrl }} />
        </TouchableNativeFeedback>
      </View>
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

  title: {
    color: '#fff',
  },
});
