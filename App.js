import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import HomeScreen from "./screens/HomeScreen.js";
import TickerScreen from "./screens/TickerScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

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
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home${focused ? "" : "-outline"}`;
        } else if (routeName === "Ticker") {
          iconName = `ios-grid${focused ? "" : "-outline"}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={28} color={tintColor} />;
      }
    }),
    // tabBarOptions: {
    //   activeTintColor: "tomato",
    //   inactiveTintColor: "gray"
    // }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
