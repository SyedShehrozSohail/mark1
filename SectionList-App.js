import React from "react";
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar } from "react-native";

const DATA = [
  {
    title: "Section Head For Data A",
    data: ["Afghanistan", "Afghanistan", "Afghanistan", "China", "Columbia", "Canada"]
  },
  {
    title: "Section Head For Data B",
    data: ["Benin", "Bhutan", "Bosnia", "Brazil", "Botswana", "Bangladesh", "China", "Columbia", "Canada", "Benin", "Bhutan", "Bosnia", "Brazil", "Botswana", "Bangladesh"]
  },
  {
    title: "Section Head For Data C",
    data: [ "China", "Columbia", "Canada", "China", "Columbia", "Canada"]
  },
  {
    title: "Section Head For Data D",
    data: ["Dishoom", "China", "Columbia", "Canada"]
  }
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    backgroundColor: "#606F37",
    fontSize: 20,
    color: "#fff",
    paddingHorizontal:8,
  },
  item: {
    marginHorizontal: 16,
    fontSize: 24,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});

export default App;