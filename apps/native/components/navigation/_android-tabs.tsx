// (tabs)/_android-tabs.tsx

import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAuthTheme from "@/hooks/use-auth-theme";
import { TABS } from "@/lib/constants/tab-config";

function TabIcon({
  name,
  focused,
  label,
}: {
  name: string;
  focused: boolean;
  label: string;
}) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red", // You'll remove this
        paddingHorizontal: 16, // Space between tabs
        paddingTop: 12,
        paddingBottom: 8,
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: focused ? "rgba(0, 128, 100, 0.3)" : "transparent",
        }}
      >
        <MaterialIcons
          name={name as any}
          size={22}
          color={focused ? "#fff" : "#9CA3AF"}
        />
      </View>

      {!focused && (
        <Text
          style={{
            fontSize: 11,
            color: "#9CA3AF",
            textAlign: "center",
            marginTop: 6,
            includeFontPadding: false,
          }}
        >
          {label}
        </Text>
      )}
    </View>
  );
}

export default function AndroidTabs() {
  const insets = useSafeAreaInsets();
  const { isDark } = useAuthTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom > 0 ? insets.bottom + 10 : 20,
          left: 20,
          right: 20,
          height: 78, // Fixed height back to original
          borderRadius: 40,
          backgroundColor: isDark ? "#0f201c" : "#ffffff",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          flexDirection: "row",
          alignItems: "center", // This vertically centers everything
          justifyContent: "space-evenly",
        },
        tabBarItemStyle: {
          width: "auto",
          alignItems: "center",
          justifyContent: "center",
          height: "100%", // Take full height for proper centering
        },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon name={tab.md} focused={focused} label={tab.label} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
