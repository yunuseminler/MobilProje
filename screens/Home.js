import React, { useState,useEffect } from 'react';
import { View, Button, Text, StyleSheet,SafeAreaView,TextInput} from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component-2';
import { firebaseAuth } from '../firebase'
import { firestoreDb } from '../firebase'
import { getDocs,getDoc,setDoc,doc,collection, query, where} from "firebase/firestore"; 
import Login from "./Login";



export default function Home({navigation}) {
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [adres, setAdres] = useState("");
  const [tel, setTel] = useState("");
  const [data, setData] = useState({});
  const [orders, setOrders] = useState([{}]);
  const [index, setIndex] = useState();

  const onPressSend = async () => {
    const docRef = await setDoc(doc(firestoreDb, "userData", firebaseAuth.currentUser.email), {
      name: ad,
      surname: soyad,
      adres, adres,
      tel: tel
    });
    navigation.replace("Ana Sayfa")
  }
  
  const LoginKontrol = async () =>{
    const docRef = doc(firestoreDb, "userData", firebaseAuth.currentUser.email);
    const docSnap = await getDoc(docRef);  
    if (docSnap.exists()) {
      setIndex(1);
      setData(docSnap.data());
    } else {
      setIndex(0);
    }
  };
  LoginKontrol()
  const getOrder = async () =>  {
    const q = query(collection(firestoreDb, "Siparis"), where("email", "==", firebaseAuth.currentUser.email));
    const querySnapshot = await getDocs(q);
    const temp = [];

    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setOrders(temp);
  }
  
  const writeOrder = () =>  {
    let count = 0;
    var list = ["Aktif", "Tamamlanmış"];
    return orders.map(i => (
      <View style={styles.row}>
        <Text style={styles.cell}>{++count}</Text>
        <Text style={{width:'50%'}}>{i.tarih}</Text>
        <Text style={styles.cell}>{list[i.status]}</Text>
      </View>
    ))
  }
  if(index==0){
    return (
      <SafeAreaView style={styles.center}>
        <Text style= {styles.headText}>Bilgi Ekle</Text>
          <TextInput  
            style={styles.input}
            onChangeText={setAd}
            value={ad}
            placeholder = 'Ad'
          />
          <TextInput  
            style={styles.input}
            onChangeText={setSoyad}
            value={soyad}
            placeholder = 'Soyad'
          />
          <TextInput  
            style={styles.input}
            onChangeText={setAdres}
            value={adres}
            placeholder = 'Adres'
          />
          <TextInput  
            style={styles.input}
            onChangeText={setTel}
            value={tel}
            placeholder = 'Telefon No'
          />
          <Button
            onPress={onPressSend}
            title="Ekle"
            color= "#9AC4F8"
            accessibilityLabel="Gönder"
          />
      </SafeAreaView>
    );  }
  else{
    getOrder()
    return (
      <View style={styles.center}>
        <View><h1>Hoşgeldin {data.name}  </h1>
        <Button
          title="Sipariş Oluştur"
          onPress={() =>{navigation.navigate("Siparis")}}
        />
        </View>
        <View style={{ width : '75%',marginTop: 10}}>
          <View style={styles.row}>
            <Text style={styles.cell}>No</Text>
            <Text style={{width:'50%'}}>Tarih</Text>
            <Text style={styles.cell}>Durum</Text>
          </View>
          {writeOrder()}
        </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  row:{
    flexDirection: "row",
  },
  cell:{
    width: '25%'
  },
  input: {
    height: 40,
    marginTop : 10,
    marginBottom : 10,
    borderWidth: 1,
    padding: 10,
    width : '50%'
  },
  headText : {
    marginTop: 20,
    fontSize : 30,
    width : '100%',
    textAlign : 'center'
  },
  imageButton : {
    marginTop : 10
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

