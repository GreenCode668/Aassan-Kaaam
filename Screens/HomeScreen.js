import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions
} from "react-native";
import { RkText, RkButton, RkStyleSheet } from "react-native-ui-kitten";
import { FontIcons } from "../assets/icons";
import { authActions } from "../redux/actions/auth.actions";
import { connect } from "react-redux";
import CategoryView from "./CategoryView";

const paddingValue = 8;

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    const screenWidth = Dimensions.get("window").width;
    this.itemSize = {
      width: (screenWidth - paddingValue * 6) / 2,
      height: (screenWidth - paddingValue * 6) / 2
    };
  }
  static navigationOptions = {
    title: "Home".toUpperCase(),
    headerLeft: null
  };

  goToCateogory = name => {
    const skill = name;
    console.log(skill);
    this.props.viewCateogry(skill);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.data) {
      this.props.navigation.navigate("Category");
    }
    console.warn('Home Screen',nextProps.auth);
  }
  render() {
    return (
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.rootContainer}
      >
        <RkButton
          rkType="square shadow"
          style={{ ...this.itemSize }}
          key={323}
          onPress={() => this.goToCateogory("electrician")}
        >
          <RkText style={styles.icon} rkType="primary moon xxlarge">
            {FontIcons.article}
          </RkText>
          <RkText>Electrician</RkText>
        </RkButton>
        <RkButton
          rkType="square shadow"
          style={{ ...this.itemSize }}
          key={323}
          onPress={() => this.goToCateogory("labour")}
        >
          <RkText style={styles.icon} rkType="primary moon xxlarge">
            {FontIcons.mobile}
          </RkText>
          <RkText>Labour</RkText>
        </RkButton>
        <RkButton
          rkType="square shadow"
          style={{ ...this.itemSize }}
          key={323}
          onPress={() => this.goToCateogory("makeup_artist")}
        >
          <RkText style={styles.icon} rkType="primary moon xxlarge">
            {FontIcons.mobile}
          </RkText>
          <RkText>Makeup Artist</RkText>
        </RkButton>
        <RkButton
          rkType="square shadow"
          style={{ ...this.itemSize }}
          key={323}
          onPress={() => this.goToCateogory("handy_man")}
        >
          <RkText style={styles.icon} rkType="primary moon xxlarge">
            {FontIcons.mobile}
          </RkText>
          <RkText>Handy Man</RkText>
        </RkButton>
        <RkButton
          rkType="square shadow"
          style={{ ...this.itemSize }}
          key={323}
          onPress={() => this.goToCateogory("painter")}
        >
          <RkText style={styles.icon} rkType="primary moon xxlarge">
            {FontIcons.mobile}
          </RkText>
          <RkText>Painter</RkText>
        </RkButton>
        <RkButton
          rkType="square shadow"
          style={{ ...this.itemSize }}
          key={323}
          onPress={() => this.goToCateogory("cleaner")}
        >
          <RkText style={styles.icon} rkType="primary moon xxlarge">
            {FontIcons.mobile}
          </RkText>
          <RkText>Cleaning</RkText>
        </RkButton>
        <RkButton
          rkType="square shadow"
          style={{ ...this.itemSize }}
          key={323}
          onPress={() => this.props.navigation.navigate("OrderConfirm")}
        >
          <RkText style={styles.icon} rkType="primary moon xxlarge">
            {FontIcons.mobile}
          </RkText>
          <RkText>View Orders</RkText>
        </RkButton>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#e5e5e5",
    padding: 8
  },
  rootContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  icon: {
    fontSize: 80,
    color: "#ff6d20",
    marginBottom: 16
  }
});

function mapStateToProps(state) {
  return {
    auth: state.auth,
    category: state.category
  };
}

const mapDispatchToProps = dispatch => {
  return {
    viewCateogry: skill => {
      dispatch(authActions.viewCateogry(skill));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
