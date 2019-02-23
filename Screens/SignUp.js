import React, { Component } from "react";
import {
  View,
  Image,
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Text,
  CheckBox,
  Alert
} from "react-native";
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme,
  RkChoice,
  RkChoiceGroup
} from "react-native-ui-kitten";
import { FontAwesome } from "../assets/icons";
import { GradientButton } from "../components/gradientButton";
import { scaleModerate, scaleVertical } from "../utils/scale";
import { authActions } from "../redux/actions/auth.actions";
import { connect } from "react-redux";

class SignUp extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      electrician: false,
      labour: false,
      makeup_artist: false,
      handy_man: false,
      cleaner: false,
      painter: false,
      plumber: false
    };
  }

  componentWillReceiveProps(nextProps){
      console.warn(nextProps)
      if(nextProps.auth.user){
        this.props.navigation.navigate('Home')
      }
  }

  onSignUpButtonPressed = () => {
    const email = this.state.email;
    const password = this.state.password;
    const name = this.state.name;
    const skills = {
      labour: this.state.labour,
      electrician: this.state.electrician,
      makeup_artist: this.state.makeup_artist,
      handy_man: this.state.handy_man,
      cleaner: this.state.cleaner,
      painter: this.state.painter,
      plumber: this.state.plumber
    };
    this.props.register(email, password, name, skills);
  };
  render() {
    return (
      <View style={styles.screen}>
        <View style={{ alignItems: "center" }}>
          <RkText rkType="h1">Registration For Servicer</RkText>
        </View>
        <View style={styles.content}>
          <View>
            <RkTextInput
              rkType="rounded"
              placeholder="Name"
              onChangeText={text => this.setState({ name: text })}
            />
            <RkTextInput
              rkType="rounded"
              placeholder="Email"
              onChangeText={text => this.setState({ email: text })}
            />
            <RkTextInput
              rkType="rounded"
              placeholder="Password"
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
            />

            <View style={{ alignItems: "center" }}>
              <RkText rkType="h3">Apka hunar kia Ha</RkText>
            </View>
            <RkChoiceGroup
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between"
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckBox
                  value={this.state.electrician}
                  onValueChange={() =>
                    this.setState({
                      electrician: !this.state.electrician
                    })
                  }
                />
                <Text>Electrician</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckBox
                  value={this.state.labour}
                  onValueChange={() =>
                    this.setState({
                      labour: !this.state.labour
                    })
                  }
                />
                <Text>Labour</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckBox
                  value={this.state.makeup_artist}
                  onValueChange={() =>
                    this.setState({
                      makeup_artist: !this.state.makeup_artist
                    })
                  }
                />
                <Text>Makeup Artist</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckBox
                  rkType="defualt"
                  onValueChange={() =>
                    this.setState({
                      handy_man: !this.state.handy_man
                    })
                  }
                />
                <Text>Handy Man</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckBox
                  value={this.state.painter}
                  onValueChange={() =>
                    this.setState({
                      painter: !this.state.painter
                    })
                  }
                />
                <Text>Painter</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckBox
                  value={this.state.cleaner}
                  onValueChange={() =>
                    this.setState({
                      cleaner: !this.state.cleaner
                    })
                  }
                />
                <Text>Cleaning</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckBox
                  value={this.state.plumber}
                  onValueChange={() =>
                    this.setState({
                      plumber: !this.state.plumber
                    })
                  }
                />
                <Text>Plumber</Text>
              </View>
            </RkChoiceGroup>

            <GradientButton
              style={styles.save}
              rkType="large"
              text="SIGN UP"
              onPress={this.onSignUpButtonPressed}
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType="primary3">Already have an account?</RkText>
              <RkButton
                rkType="clear"
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <RkText rkType="header6">Sign in now</RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    padding: 16,
    flex: 1,
    justifyContent: "space-around"
  },
  image: {
    marginBottom: 10,
    height: scaleVertical(77),
    resizeMode: "contain"
  },
  content: {
    justifyContent: "space-between"
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: "row",
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: "space-around"
  },
  footer: {
    justifyContent: "flex-end"
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "center"
  }
});

function mapStateToProps(state) {
  return {
      auth:state.auth
  };
}

const mapDispatchToProps = dispatch => {
  return {
    register: (email, password, name, skills) => {
      dispatch(authActions.register(email, password, name, skills,this.props));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
