import {
  createBottomTabNavigator,
  createBottomTabScreen,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';

const MyTabs = createBottomTabNavigator({
  screens: {
    Home: createBottomTabScreen({
      screen: HomeScreen,
    }),

 
  },
});