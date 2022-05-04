import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseList from "./screens/CourseList";
import CourseDetail from "./screens/CourseDetail";
import React, { useState } from "react";

const Stack = createNativeStackNavigator();



function MyStack() {

  const [needRefresh, setNeedRefresh] = useState(false)

  return (
    <Stack.Navigator
      screenListeners={{
        state: (evt) => {
          if(evt.data.state.routes.length===1){
            setNeedRefresh(!needRefresh)
          }
          console.log("event", evt);
        },
      }}
    >
      <Stack.Screen name="CourseList">
        {props => <CourseList {...props} needRefresh={needRefresh}/> }
      </Stack.Screen>
      <Stack.Screen name="CourseDetail" component={CourseDetail} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
