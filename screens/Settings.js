import React, { useState } from 'react';
import { firebaseAuth } from '../firebase'
import { firestoreDb } from '../firebase'
import { getDoc,doc} from "firebase/firestore"; 
import { View, StyleSheet, Text,h1 ,h3,Button} from "react-native";

export default function Settings({route}) {
  const param = route.params.params;
  const handleSignOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        param.replace("Login")
      })
      .catch(error => alert(error.message))
  }
  const [data, setData] = useState({});
  const log = async () =>{
    const docRef = doc(firestoreDb, "userData", firebaseAuth.currentUser.email);
    const docSnap = await getDoc(docRef);  
    if (docSnap.exists()) {
      setData(docSnap.data());
    }
  };
  log()
  
  return(
    <View style={styles.center}>
      <h1>{data.name} {data.surname}</h1>
      <h3>Adres: {data.adres}</h3>
      <h3>Telefon: {data.tel}</h3>
      <Button
          title="Çıkış Yap"
          onPress={handleSignOut}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

