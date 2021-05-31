import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";

const App = () => {
  const [text, onChangeText] = React.useState("Random Text");
  const [number, onChangeNumber] = React.useState(null);
  function clearTextFileds () {
    onChangeText('');
    onChangeNumber('');
  }
  return (
    <SafeAreaView>
      <Text style={{textAlign:"center", fontWeight: "bold", fontSize: 30, marginTop: 100, color: "red"}}>
        This is Textinput Example
      </Text>
      <TextInput
        maxLength={10}
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Random Placeholder"
        value={text}
      />
      <TextInput
        maxLength={10}
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Random Placeholder"
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={()=>  {clearTextFileds()}}>
        <Text style={{textAlign:"center", borderWidth: 1, margin: 12, borderRadius: 10, color: "blue"}}>Submit</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderBottomWidth: 1,
  },
});

export default App;