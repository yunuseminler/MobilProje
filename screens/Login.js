import { useNavigation } from '@react-navigation/core'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import React, {useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,Alert } from 'react-native'
import { firebaseAuth } from '../firebase'
import { firestoreDb} from '../firebase'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications'; 


async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()


  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      navigation.replace("Ana Sayfa")
    }
  });
  const handleSignUp = () => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
  .then((userCredential) => {
    
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    alert("Kayıt Başarısız tekrar deneyin")
    // ..
  });
  }

  const handleLogin = async () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
    .then(async (userCredential) => {
      registerForPushNotificationsAsync().then(async token => {
        await setDoc(doc(firestoreDb, "userToken", email), {
          expoToken : token,
        })
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message.replace("Firebase:", "");;
      Alert.alert(
        errorCode,
        errorMessage,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})
