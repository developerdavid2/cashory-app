// (tabs)/_ios-tabs.tsx
// iOS gets the native UITabBar via NativeTabs — feels completely at home on iPhone.
// Style changes here never touch Android.

import { View, Pressable, Text } from "react-native";
import { BlurTargetView } from "expo-blur";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useThemeColor } from "heroui-native";
import useAuthTheme from "@/hooks/use-auth-theme";
import { TABS } from "@/lib/constants/tab-config";
import { GeneralEdit } from "@/components/ui/icons/GeneralEdit";

interface IOSTabsProps {
  onFabPress: () => void;
}

export default function IOSTabs({ onFabPress }: IOSTabsProps) {
  const themeColorBackground = useThemeColor("background");
  const { isDark } = useAuthTheme();

  return (
    <BlurTargetView style={{ flex: 1, backgroundColor: themeColorBackground }}>
      <NativeTabs
        iconColor={{
          default: isDark ? "#A3A3A3" : "#16302B",
          selected: isDark ? "#FFFFFF" : "#16302B",
        }}
        labelStyle={{
          default: {
            color: isDark ? "#A3A3A3" : "#16302B",
            fontWeight: "600",
          },
          selected: {
            color: isDark ? "#FFFFFF" : "#16302B",
            fontWeight: "600",
          },
        }}
        backgroundColor={themeColorBackground}
        blurEffect="systemMaterialDark"
      >
        {TABS.map((tab) => (
          <NativeTabs.Trigger key={tab.name} name={tab.name}>
            <NativeTabs.Trigger.Icon sf={tab.sf} />
            <NativeTabs.Trigger.Label>{tab.label}</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
        ))}
      </NativeTabs>

      {/* FAB — positioned above the native tab bar */}
      <View
        className="absolute right-6 bottom-32 z-10 w-15 h-15"
        pointerEvents="box-none"
      >
        <Pressable
          className="flex-1 rounded-[40px] bg-[#16302B] items-center justify-center p-3.25 border-2 border-transparent dark:border-[#3b82f615]"
          style={{
            shadowColor: "rgba(0,0,0,0.5)",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 15,
            elevation: 16,
          }}
          onPress={onFabPress}
        >
          <GeneralEdit color="#FFFFFF" width={22} height={22} />
        </Pressable>
      </View>
    </BlurTargetView>
  );
}
