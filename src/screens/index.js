import { Navigation } from 'react-native-navigation';

import Home from './Home';
import Header from './Home/Header';
import News from './News';
import Video from './Video';
import Fuli from './Fuli';
import FullScreenViewer from './Fuli/FullScreenViewer';
import Reader from './News/Reader';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('app.Home', () => Home);
  Navigation.registerComponent('app.Home.Header', () => Header);
  Navigation.registerComponent('app.News', () => News);
  Navigation.registerComponent('app.News.Reader', () => Reader);
  Navigation.registerComponent('app.Video', () => Video);
  Navigation.registerComponent('app.Fuli', () => Fuli);
  Navigation.registerComponent('app.Fuli.FullScreenViewer', () => FullScreenViewer);
}
