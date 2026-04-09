import { View, Text } from "react-native";
import React from "react";
import SafeArea from "@/components/safe-area";
import { useThemeColor } from "heroui-native";

export default function ReportsScreen() {
  const themeColorBackground = useThemeColor("background");
  return (
    <SafeArea style={{ backgroundColor: themeColorBackground }}>
      <Text>Reports</Text>
    </SafeArea>
  );
}
