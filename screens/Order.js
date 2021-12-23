import React, { useState } from 'react';
import { Button, StyleSheet,SafeAreaView,TextInput} from "react-native";
import { firebaseAuth } from '../firebase'
import { firestoreDb } from '../firebase'
import { collection,getDocs, addDoc} from "firebase/firestore"; 



export default function Home({navigation}) {
  const [aciklama, setAciklama] = useState("");
  const onPressSend = async () => {
    const docRef = await addDoc(collection(firestoreDb, "Siparis"), {
      email: firebaseAuth.currentUser.email,
      acikla: aciklama,
      tarih: "23.12.2021 - 12.54",
      status: 0
    }
    )
    const querySnapshot = await getDocs(collection(firestoreDb, "userTokens"));

    var expoPushTokens = [];
    await querySnapshot.forEach(async (doc) => {
      expoPushTokens.push(doc.data().expoToken);
    });

    console.log(expoPushTokens)
    
    const message = {
      to: expoPushTokens,
      sound: 'default',
      title: 'Yeni Sipariş Oluşturuldu',
      body: 'YeniSipariş Oluşturuldu görmek için hemen giriş yap :)',
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    }).then(navigation.navigate("Ana Sayfa"));
  }
    return (
      <SafeAreaView  style= {styles.center}>
        <h1>Yeni Sipariş Oluştur</h1>
        
          <TextInput  
            style={styles.input}
            onChangeText={setAciklama}
            value={aciklama}
            placeholder = 'Açıklama Giriniz (İsteğe Bağlı)'
          />
        <h3>Getirme Ücreti 5 TL</h3>
          <Button
            onPress={onPressSend}
            title="Ekle"
            color= "#9AC4F8"
            accessibilityLabel="Send"
          />
      </SafeAreaView>
    );
};


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  input: {
    height: 40,
    marginTop : 10,
    marginBottom : 10,
    borderWidth: 1,
    padding: 10,
    width : '50%'
  },
});

