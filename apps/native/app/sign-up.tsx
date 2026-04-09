import { View, Text } from "react-native";
import React from "react";
import SignUpTemplate from "@/components/templates/auth/signup-template";
import { Stack } from "expo-router";

const SignUp = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SignUpTemplate />
    </>
  );
};

export default SignUp;
