import SettingsHeader from "@/components/base/settings/settings-header";
import { Container } from "@/components/container";
import NotificationSettingsView from "@/components/containers/settings/notification-setting-view";
import SafeArea from "@/components/safe-area";
import { useThemeColor } from "heroui-native";

export default function SettingsNotification() {
  const themeColorBackground = useThemeColor("background");
  return (
    <SafeArea style={{ backgroundColor: themeColorBackground }}>
      <SettingsHeader title={"Notification Settings"} />
      <Container className="p-4 md:p-6" isScrollable={true}>
        <NotificationSettingsView />
      </Container>
    </SafeArea>
  );
}
