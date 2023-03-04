import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import SignUpForm from "./screens/SignUpForm";
import Profile from "./screens/Profile";

const Navigator = () => {
  const Stack = createNativeStackNavigator();
  const isUserLoggedIn = false;
  if (!isUserLoggedIn) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Register" component={SignUpForm} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    );
  }
};

const App = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
