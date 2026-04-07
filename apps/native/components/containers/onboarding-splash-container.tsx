import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "heroui-native";
import { Logo } from "../ui/logo";
import { ONBOARDING_TEXT_STYLE } from "@/lib/constants/onboarding-typography";

const OnboardingSplashContainer = ({ message }: { message: string }) => {
  const insets = useSafeAreaInsets();

  const backgroundColor = useThemeColor("accent");
  const foregroundColor = useThemeColor("foreground");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 28,
        paddingHorizontal: 24,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 26,
          paddingBottom: 140,
        }}
      >
        <Logo size={1.25} color={foregroundColor} />
        <ActivityIndicator size="large" color={foregroundColor} />
      </View>
      <Text
        style={{
          ...ONBOARDING_TEXT_STYLE.splashMessage,
          color: foregroundColor,
          textAlign: "center",
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default OnboardingSplashContainer;
