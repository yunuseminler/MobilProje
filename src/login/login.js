import React, { Component } from "react";

import styles from "./style";
import {Button,Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';

const appId = "1047121222092614"

export default class LoginScreen extends Component {

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Instamobile</Text>
              <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
              <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}/>
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onLoginPress()}
                title="Login"
              />
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onLoginPress() {

  }

  
}
