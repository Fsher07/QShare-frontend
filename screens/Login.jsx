import React, { useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { Input, Button, Text } from "@rneui/themed";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import styles from "./Login.style";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://297a-176-232-58-79.eu.ngrok.io/accounts/login",
          {
            email: values.email,
            password: values.password,
          }
        );
        console.log(response.data);
        navigation.navigate("Profile");
      } catch (error) {
        console.error(error);
        Alert.alert("Success", "Login was successful", [{ text: "OK" }], {
          cancelable: false,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Input
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        value={formik.values.email}
        placeholder="Email"
      />
      {formik.touched.email && formik.errors.email ? (
        <Text>{formik.errors.email}</Text>
      ) : null}
      <Input
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        value={formik.values.password}
        placeholder="Password"
        secureTextEntry={true}
      />
      {formik.touched.password && formik.errors.password ? (
        <Text>{formik.errors.password}</Text>
      ) : null}
      <Button
        title="Login"
        onPress={formik.handleSubmit}
        disabled={isLoading}
      />
      {isLoading ? <ActivityIndicator /> : null}
    </View>
  );
};

export default Login;
