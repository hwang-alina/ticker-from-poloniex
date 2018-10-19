import React from "react";
import { View, Text, Button } from "react-native";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Экран о приложении.</Text>
        <Button
          title="Ticker"
          onPress={() => this.props.navigation.navigate("Ticker")}
        />
      </View>
    );
  }
}
