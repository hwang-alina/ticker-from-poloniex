import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import HomeScreen from "./screens/HomeScreen.js";
import TickerScreen from "./screens/TickerScreen";

const RootStack = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator({
        Home: { screen: HomeScreen }
      })
    },
    Ticker: {
      screen: createStackNavigator({ Ticker: { screen: TickerScreen } })
    }
  },
  {
    navigationOptions: {
      header: {
        visible: true
      }
    },
    tabBarOptions: {
      tabStyle: {
        flex: 1,
        justifyContent: "center"
      }
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
