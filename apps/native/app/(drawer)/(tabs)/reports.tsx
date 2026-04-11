import SafeArea from "@/components/safe-area";
import ReportsTemplate from "@/components/templates/reports-template";
import { useThemeColor } from "heroui-native";
import React from "react";

export default function ReportsScreen() {
  const themeColorBackground = useThemeColor("background");
  return (
    <SafeArea style={{ backgroundColor: themeColorBackground }}>
      <ReportsTemplate />
    </SafeArea>
  );
}
