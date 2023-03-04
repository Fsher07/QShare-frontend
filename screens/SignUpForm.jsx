import React, { useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input, Button, Text } from "@rneui/themed";
import axios from "axios";

const SignUpForm = () => {
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
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
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
      {isLoading && <ActivityIndicator style={styles.spinner} size="large" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    marginTop: 10,
  },
});

export default SignUpForm;
