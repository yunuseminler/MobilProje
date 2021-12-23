import React from "react";
import { View, StyleSheet, Text,h1 ,h3} from "react-native";

const Help = () => {
  return (
    <View style={styles.center}>
      <h1>Dükkan Adı: Kısmet Terzi</h1>
      <h3>Adres: Yenidoğan Mh Caner sk. No:2</h3>
      <h3>İletişim No: 05415613071</h3>
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

export default Help;
