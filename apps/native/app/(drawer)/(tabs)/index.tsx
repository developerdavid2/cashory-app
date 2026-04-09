import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Avatar, useThemeColor } from "heroui-native";
import { Container } from "@/components/container";
import SafeArea from "@/components/safe-area";
import { GeneralAlarm } from "@/components/ui/icons/GeneralAlarm";
import { GeneralSearch } from "@/components/ui/icons/GeneralSearch";
import { ONBOARDING_FONT_FAMILY } from "@/lib/constants/onboarding-typography";
import CashoryCardBalance from "@/components/containers/cashory-card-balance";

export default function HomeScreen() {
  const themeColorBackground = useThemeColor("background");
  const insets = useSafeAreaInsets();
  const { data: sessionData } = useAuthSession();
  const user = sessionData?.data?.user;
  const userName = user?.name || "User";
  const userImage = user?.image;
  const { iconColor } = useThemeColors();

  return (
    <SafeArea style={{ backgroundColor: themeColorBackground }}>
      <Container className="p-4 md:p-6" isScrollable={false}>
        <ScrollView
          className="flex-1 w-full"
          contentContainerStyle={{
            paddingBottom: insets.bottom + 120,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-center justify-between mb-8 w-full pt-1">
            <View className="flex-row items-center gap-2.5">
              <Avatar className="size-10" alt="Profile Avatar">
                {userImage ? (
                  <Avatar.Image source={{ uri: userImage }} asChild>
                    <Image
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  </Avatar.Image>
                ) : (
                  <Avatar.Fallback>
                    <Text
                      className="text-[22px] text-brand-white"
                      style={{ fontFamily: ONBOARDING_FONT_FAMILY.bold }}
                    >
                      {userName.charAt(0).toUpperCase()}
                    </Text>
                  </Avatar.Fallback>
                )}
              </Avatar>
              <View className="flex-col justify-center gap-y-1">
                <Text
                  className="text-[14px] leading-3.5 text-brand-black dark:text-brand-white"
                  style={{ fontFamily: "PlusJakartaSans_400Regular" }}
                >
                  Welcome,
                </Text>
                <Text
                  className="text-h6 leading-5 text-brand-black dark:text-brand-white"
                  style={{ fontFamily: "PlusJakartaSans_700Bold" }}
                >
                  {userName}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-x-2.5">
              <Pressable className="w-12.5 h-12.5 rounded-[40px] bg-brand-flashwhite dark:bg-brand-green-800 items-center justify-center">
                <GeneralSearch color={iconColor} width={23} height={23} />
              </Pressable>
              <Link href="/notifications" asChild>
                <Pressable className="w-12.5 h-12.5 rounded-[40px] bg-brand-flashwhite dark:bg-brand-green-800 items-center justify-center">
                  <GeneralAlarm color={iconColor} width={23} height={23} />
                </Pressable>
              </Link>
            </View>
          </View>
          <View className="flex-col w-full gap-y-2.5 mb-7">
            <CashoryCardBalance
              totalBalance={5000}
              earned={1000}
              spent={3000}
              available={4000}
              savings={2000}
            />
            <Pressable
              className="w-full bg-brand-green-500 items-center justify-center p-4 min-h-14.25"
              style={{ borderRadius: 50 }}
            >
              <Text
                className="text-[16px] leading-4.75 text-brand-white"
                style={{ fontFamily: "PlusJakartaSans_700Bold" }}
              >
                Scan here
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </Container>
    </SafeArea>
  );
}
