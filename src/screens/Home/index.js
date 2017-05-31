import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, ScrollView, StatusBar, FlatList } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { px2dp, SCREEN_WIDTH } from '../../utils';

import Section from './Section';

import { get } from '../../data';

export default class Home extends React.Component {
  static navigatorStyle = {
    navBarHideOnScroll: false,
    navBarBackgroundColor: '#fff', // This will be the TitleBars color when the react view is hidden and collapsed
    collapsingToolBarComponent: 'app.Home.Header',
    navBarTranslucent: true, // Optional, sets a translucent dark background to the TitleBar. Useful when displaying bright colored header to emphasize the title and buttons in the TitleBar
    showTitleWhenExpended: false, // default: true. Show the screens title only when the toolbar is collapsed
    collapsingToolBarCollapsedColor: '#000', // optional. The TitleBar (navBar) color in collapsed state
    collapsingToolBarExpendedColor: 'red', // optional. The TitleBar (navBar) color in expended state
    navBarTextColor: '#fff',
  };

  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      sections: [],
      data: {},
    };
  }

  // http://gank.io/api/day/2015/08/07
  componentDidMount() {
    get('http://gank.io/api/day/history').then(res1 => {
      const latest = res1.results[0].replaceAll('-', '/');

      get(`http://gank.io/api/day/${latest}`).then(res => {
        this.setState({
          ready: true,
          sections: res.category,
          data: res.results,
        });
      });
    });
  }

  render() {
    if (!this.state.ready) {
      return <ActivityIndicator size="large" style={{ marginTop: 30 }} />;
    }

    return (
      <ScrollView>
        {this.state.sections.map(item => {
          if (item === '福利') {
            return null;
          }

          return <Section key={item} title={item} items={this.state.data[item]} navigator={this.props.navigator} />;
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  subtitleWrapper: {
    height: px2dp(90),
    backgroundColor: '#9E9E9E',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },

  subtitle: {
    color: '#212121',
    fontSize: px2dp(38),
    fontWeight: 'bold',
  },

  item: {
    padding: 25,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: px2dp(1),
  },

  itemSeparator: {
    height: px2dp(90),
    width: SCREEN_WIDTH,
    backgroundColor: '#222',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e9e9e9',
  },
});
