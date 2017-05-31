import React from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';

import { px2dp } from '../../utils';

export default class Section extends React.PureComponent {
  _onItemPress = url => {
    this.props.navigator.push({
      screen: 'app.News.Reader', // unique ID registered with Navigation.registerScreen
      title: undefined, // navigation bar title of the pushed screen (optional)
      passProps: {
        url,
      }, // Object that will be passed as props to the pushed screen (optional)
      animated: true, // does the push have transition animation or does it happen immediately (optional)
      backButtonTitle: '返回', // override the back button title (optional)
      backButtonHidden: false, // hide the back button altogether (optional)
      navigatorStyle: {
        // navBarHideOnScroll: true,
        // navBarTextColor: '#fff', // change the text color of the title (remembered across pushes)
        // // navBarTextFontFamily: 'font-name', // Changes the title font
        // navBarBackgroundColor: '#000', // change the background color of the nav bar (remembered across pushes)
        // drawUnderTabBar: true, // draw the screen content under the tab bar (the tab bar is always translucent)
        // statusBarBlur: true, // blur the area under the status bar, works best with navBarHidden:true
        // navBarBlur: true, // blur the entire nav bar, works best with drawUnderNavBar:true
        // navBarButtonColor: '#fff',
      }, // override the navigator style for the pushed screen (optional)
      navigatorButtons: {}, // override the nav buttons for the pushed screen (optional)
    });
  };

  _renderItems = () => {
    return this.props.items.map(item => (
      <TouchableNativeFeedback key={item._id} onPress={() => this._onItemPress(item.url)}>
        <View style={styles.item}>
          <Text style={styles.desc}>{item.desc} <Text style={styles.author}>(via {item.who})</Text></Text>
        </View>
      </TouchableNativeFeedback>
    ));
  };

  render() {
    return (
      <View>
        <View style={styles.subtitleWrapper}>
          <Text style={styles.subtitle}>{this.props.title}</Text>
        </View>

        {this._renderItems()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subtitleWrapper: {
    height: px2dp(90),
    // backgroundColor: '#9E9E9E',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    borderLeftColor: '#9E9E9E',
    borderLeftWidth: 4,
  },

  subtitle: {
    color: '#212121',
    fontSize: px2dp(38),
    fontWeight: 'bold',
  },

  desc: {
    color: '#212121',
    fontSize: px2dp(38),
  },

  author: {
    color: '#757575',
    fontSize: px2dp(34),
  },

  item: {
    padding: 25,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
