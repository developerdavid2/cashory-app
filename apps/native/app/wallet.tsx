import { View, Text } from "react-native";
import React from "react";
import { useThemeColor } from "heroui-native";
import SafeArea from "@/components/safe-area";
import WalletTemplate from "@/components/templates/wallet-template";

export default function WalletScreen() {
  const themeColorBackground = useThemeColor("background");
  return (
    <SafeArea style={{ backgroundColor: themeColorBackground }}>
      <WalletTemplate />
    </SafeArea>
  );
}
