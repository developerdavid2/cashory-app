import useAuthTheme from "@/hooks/use-auth-theme";
import { RelativePathString, useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SettingsHeader from "../base/settings/settings-header";
import { Container } from "../container";
import SettingsOverview from "../containers/settings/settings-overview";

export default function ProfileSettingsTemplate() {
  const insets = useSafeAreaInsets();
  const { isDark } = useAuthTheme();

  const iconColor = isDark ? "#FFFFFF" : "#000000";
  const router = useRouter();

  const handleNavigate = (routePath: string) => {
    router.push(`/profile-settings/${routePath}` as RelativePathString);
  };

  return (
    <Container className="px-4" isScrollable={false}>
      {/* Header */}
      <SettingsHeader title={"Settings"} allowNavigateBack={false} />
      <ScrollView
        className="flex-1 w-full"
        contentContainerStyle={{
          paddingBottom: insets.bottom + 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        <SettingsOverview onNavigate={handleNavigate} iconColor={iconColor} />
      </ScrollView>
    </Container>
  );
}
