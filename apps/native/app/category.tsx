import { View, Text } from "react-native";
import React from "react";
import { useThemeColor } from "heroui-native";
import SafeArea from "@/components/safe-area";
import CategoryTemplate from "@/components/templates/category-template";

export default function CategoryScreen() {
  const themeColorBackground = useThemeColor("background");
  return (
    <SafeArea style={{ backgroundColor: themeColorBackground }}>
      <CategoryTemplate />
    </SafeArea>
  );
}
