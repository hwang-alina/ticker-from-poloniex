import React from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from "react-native";

export default class TickerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null
    };
  }
  static navigationOptions = {
    title: "Ticker"
  };
  componentDidMount() {
    this.getTickers();
    this.timer = setInterval(() => this.getTickers(), 5000);
    const didBlurSubscription = this.props.navigation.addListener(
      "didBlur",
      () => {
        clearInterval(this.timer);
      }
    );

    didBlurSubscription.remove();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getTickers() {
    fetch("https://poloniex.com/public?command=returnTicker")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    } else {
      const keys = Object.keys(this.state.dataSource);
      let tickersNames = keys.map((key, i) => {
        return (
          <View key={i}>
            <Text style={styles.text}>{key}</Text>
          </View>
        );
      });
      let last = keys.map((key, i) => {
        return (
          <View key={i}>
            <Text style={styles.text}>{this.state.dataSource[key].last}</Text>
          </View>
        );
      });
      let highestBid = keys.map((key, i) => {
        return (
          <View key={i}>
            <Text style={styles.text}>
              {this.state.dataSource[key].highestBid}
            </Text>
          </View>
        );
      });
      let percentChange = keys.map((key, i) => {
        return (
          <View key={i}>
            <Text style={styles.text}>
              {this.state.dataSource[key].percentChange}
            </Text>
          </View>
        );
      });
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.column}>{tickersNames}</View>
          <View style={styles.column}>{last}</View>
          <View style={styles.column}>{highestBid}</View>
          <View style={styles.column}>{percentChange}</View>
        </ScrollView>
      );
    }
  }
}
const styles = StyleSheet.create({
  column: {},
  container: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: "space-between"
  },
  row: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch"
  },
  text: {
    fontSize: 10
  }
});
