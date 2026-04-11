import { Slot, Stack } from "expo-router";

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="account" options={{ headerShown: false }} />
      <Stack.Screen
        name="notification-settings"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default SettingsLayout;
