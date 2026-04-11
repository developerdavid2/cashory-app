import { View, Text } from "react-native";
import React from "react";
import { useThemeColor } from "heroui-native";
import SafeArea from "@/components/safe-area";

export default function Invoices() {
  const themeColorBackground = useThemeColor("background");
  return (
    <SafeArea style={{ backgroundColor: themeColorBackground }}>
      <Text>Invoices</Text>
    </SafeArea>
  );
}
