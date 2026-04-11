import { View, Text, Pressable } from "react-native";
import React from "react";
import { GeneralChevronRi } from "@/components/ui/icons/GeneralChevronRi";
import { router } from "expo-router";
import useAuthTheme from "@/hooks/use-auth-theme";

interface SettingsHeaderProps {
  title: string;

  allowNavigateBack?: boolean;
}

export default function SettingsHeader({
  title,
  allowNavigateBack = true,
}: SettingsHeaderProps) {
  const { colors } = useAuthTheme();
  return (
    <View className="flex-row items-center gap-x-2.5 mb-6 w-full pt-1 pl-4">
      {allowNavigateBack && (
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-[40px] bg-brand-flashwhite dark:bg-accent-card items-center justify-center"
        >
          <View style={{ transform: [{ rotate: "180deg" }] }}>
            <GeneralChevronRi color={colors.icon} width={23} height={23} />
          </View>
        </Pressable>
      )}

      <Text
        className="text-h3 leading-7.5 text-brand-black dark:text-brand-white"
        style={{ fontFamily: "PlusJakartaSans_700Bold" }}
      >
        {title}
      </Text>
    </View>
  );
}
