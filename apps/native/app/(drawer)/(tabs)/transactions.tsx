import { View, Text } from "react-native";
import React from "react";
import SafeArea from "@/components/safe-area";
import { useThemeColor } from "heroui-native";

export default function TransactionsScreen() {
  const themeColorBackground = useThemeColor("background");
  return (
    <SafeArea style={{ backgroundColor: themeColorBackground }}>
      <Text>Transactions</Text>
    </SafeArea>
  );
}
