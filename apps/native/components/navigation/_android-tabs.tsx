import { Tabs } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigationMode } from "react-native-navigation-mode";
import useAuthTheme from "@/hooks/use-auth-theme";
import { TABS } from "@/lib/constants/tab-config";
import { GeneralEdit } from "../ui/icons/GeneralEdit";

const TAB_ICON_HEIGHT = 60;

function TabIcon({
  name,
  focused,
  label,
  isGesture,
}: {
  name: string;
  focused: boolean;
  label: string;
  isGesture: boolean;
}) {
  const { isDark } = useAuthTheme();

  return (
    <View
      className={`w-24 h-full items-center justify-center flex-col absolute -bottom-1/2 ${
        isGesture ? "-translate-y-1/2" : ""
      }`}
    >
      <View
        className={`w-12 items-center justify-center rounded-full ${
          focused
            ? isDark
              ? "bg-brand-green-100/30 h-12 mt-2"
              : "bg-accent h-12 mt-2"
            : "bg-transparent"
        }`}
      >
        <MaterialIcons
          name={name as any}
          size={22}
          color={focused ? "#fff" : isDark ? "#9CA3AF" : "#6B6B6C"}
        />
      </View>
      <Text
        style={{
          fontSize: 11,
          color: isDark ? "#9CA3AF" : "#6B6B6C",
          textAlign: "center",
          opacity: focused ? 0 : 1,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

interface AndroidTabsProp {
  onFabPress: () => void;
}

export default function AndroidTabs({ onFabPress }: AndroidTabsProp) {
  const { isDark } = useAuthTheme();
  const insets = useSafeAreaInsets();
  const { navigationMode, loading } = useNavigationMode();

  const isGesture = loading
    ? insets.bottom > 0
    : (navigationMode?.isGestureNavigation ?? false);

  const tabBottom = Math.max(20, insets.bottom + 4);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,

          tabBarStyle: {
            position: "absolute",
            bottom: tabBottom,
            left: 0,
            right: 0,
            height: TAB_ICON_HEIGHT,
            borderRadius: 40,
            backgroundColor: isDark ? "#0f201c" : "#ffffff",
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: "#000000",
            shadowOpacity: 0.9,
            shadowRadius: 10,
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 0,
            gap: 0,
            zIndex: 90,
          },
        }}
      >
        {TABS.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  name={tab.md}
                  focused={focused}
                  label={tab.label}
                  isGesture={isGesture}
                />
              ),
            }}
          />
        ))}
      </Tabs>

      {/* FAB */}
      <View
        className={`absolute right-6 z-10 w-15 h-15 bottom-[16%] ${
          isGesture ? "translate-y-[16%]" : ""
        }`}
        pointerEvents="box-none"
      >
        <Pressable
          className="flex-1 rounded-[40px] bg-accent dark:bg-accent-card items-center justify-center p-3.25 border-2 border-transparent dark:border-[#3b82f615]"
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
    </>
  );
}
