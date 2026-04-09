import { View, Text } from "react-native";
import React from "react";
import SignUpTemplate from "@/components/templates/auth/signup-template";
import { Stack } from "expo-router";
import SignInTemplate from "@/components/templates/auth/signin-template";

const SignIn = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SignInTemplate />
    </>
  );
};

export default SignIn;
