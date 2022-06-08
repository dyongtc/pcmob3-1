import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Dimensions} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";
//import { TouchableOpacity } from "react-native-gesture-handler";
//import { useEffect } from "react/cjs/react.production.min";


function HomeScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={addColor} title="Add color"/>,
    });
  });
  // inside [] = initial value
  const [colorArray, setColorArray] = useState([]);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailsScreen", { ...item })}
      >
        <BlockRGB red={item.red} green={item.green} blue={item.blue} />
      </TouchableOpacity>
    );
  }
  function addColor() {
    setColorArray([
      {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
        id: `${colorArray.length}`,
      },
      ...colorArray,
    ]);
  }
  function resetColor() {
    setColorArray([]);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ height: 50, justifyContent: "center" }}
        onPress={resetColor}
      >
        <Text style={{ color: "blue" }}>Reset colour</Text>
      </TouchableOpacity>
      <FlatList data={colorArray} renderItem={renderItem} numColumns={4}/>
    </View>
  );
}

function DetailsScreen({route}) {
  const { red, green, blue } = route.params;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
      ]}
    >
      <View style={{ padding: 30 }}>
        <Text style={styles.detailText}>Red: {red}</Text>
        <Text style={styles.detailText}>Green: {green}</Text>
        <Text style={styles.detailText}>Blue: {blue}</Text>
      </View>
    </View>
  );
 }

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Color List" component={HomeScreen} />
       <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fff",
  alignItems: "center",
},
list:{
  flex: 1,
},
detailText: {
  fontSize: 24,
  marginBottom: 20,
},

});


