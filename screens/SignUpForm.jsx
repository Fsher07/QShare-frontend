import React, { useState } from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input, Button, Text } from "@rneui/themed";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import styles from "./SignUpFormStyle";

const SignUpForm = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://297a-176-232-58-79.eu.ngrok.io/accounts/register",
        {
          email: values.email,
          password: values.password,
        }
      );
      console.log(response.data);
      Alert.alert("Success", "Sign up was successful", [{ text: "OK" }], {
        cancelable: false,
      });
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
      />
      {formik.touched.email && formik.errors.email ? (
        <Text style={styles.errorText}>{formik.errors.email}</Text>
      ) : null}
      <Input
        label="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
      />
      {formik.touched.password && formik.errors.password ? (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      ) : null}
      <Button
        title={isLoading ? "Loading..." : "Sign Up"}
        onPress={formik.handleSubmit}
      />
      <Button
        title={"Login"}
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
      {isLoading && <ActivityIndicator style={styles.spinner} size="large" />}
    </View>
  );
};

export default SignUpForm;
