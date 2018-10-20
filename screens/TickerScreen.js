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
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      );
    } else {
      const keys = Object.keys(this.state.dataSource);
      let tickers = keys.map((key, i) => {
        return (
          <View key={i} style={styles.row}>
            <Text style={styles.text}>{key}</Text>
            <Text style={styles.text}>{this.state.dataSource[key].last}</Text>
            <Text style={styles.text}>
              {this.state.dataSource[key].highestBid}
            </Text>
            <Text style={styles.text}>
              {this.state.dataSource[key].percentChange}
            </Text>
          </View>
        );
      });

      return (
        <ScrollView contentContainerStyle={styles.container}>
          {tickers}
        </ScrollView>
      );
    }
  }
}
const styles = StyleSheet.create({
  column: {},
  container: {
    marginHorizontal: 10
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    flex: 0.25,
    fontSize: 11,
    borderWidth: 0.5,
    borderColor: "grey",
    paddingVertical: 1,
    paddingHorizontal: 3
  }
});
