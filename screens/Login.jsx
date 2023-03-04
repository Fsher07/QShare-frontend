import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Login</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
        color="blue"
        tintColor="red"
      />
    </View>
  );
};

export default Login;
