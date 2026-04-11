import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
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
import CashoryIncomeExpense from "@/components/containers/cashory-income-expense";
import CashoryBudgetPlanCard from "@/components/containers/cashory-budget-plan";
import CashoryInvoiceCard from "@/components/containers/cashory-invoice-card";
import { format } from "date-fns";
import { mapStatus } from "@/lib/constants";

export default function HomeScreen() {
  const themeColorBackground = useThemeColor("background");
  const insets = useSafeAreaInsets();
  const { data: sessionData } = useAuthSession();
  const user = sessionData?.data?.user;
  const userName = user?.name || "User";
  const userImage = user?.image;
  const { iconColor } = useThemeColors();

  // Invoice
  //   const { data: invoicesResponse, isLoading: isLoadingInvoices } = useInvoices({
  //   limit: 3,
  // });
  // const recentInvoices = invoicesResponse?.data ?? [];
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

          <View className="flex-col w-full gap-y-2.5 mb-7">
            <CashoryIncomeExpense
              incomeAmount={1000}
              expenseAmount={2500}
              dateLabel="This month"
            />
            <CashoryBudgetPlanCard
              month={"Jan"}
              onMonthChange={() => {}}
              availableCash={4000}
            />
          </View>

          <View className="flex-col w-full gap-y-2.5 mb-7">
            <View className="flex-row items-end justify-between w-full mb-1">
              <Text
                className="text-lg leading leading-6.25 text-brand-black dark:text-brand-white"
                style={{ fontFamily: "PlusJakartaSans_700Bold" }}
              >
                Invoice
              </Text>

              <Link href="/invoices" asChild>
                <Pressable>
                  <Text
                    className="text-[14px] leading-3.75 text-brand-black dark:text-brand-white"
                    style={{ fontFamily: "PlusJakartaSans_400Regular" }}
                  >
                    See all
                  </Text>
                </Pressable>
              </Link>
            </View>

            {/* {isLoadingInvoices ? (
            <View className="items-center py-6">
              <ActivityIndicator size="small" />
            </View>
          ) : recentInvoices.length === 0 ? (
            <View className="items-center py-6">
              <Text
                className="text-[13px] text-brand-grey dark:text-gray-400"
                style={{ fontFamily: "PlusJakartaSans_400Regular" }}
              >
                No invoices yet
              </Text>
            </View>
          ) : (
            recentInvoices.map((inv: any) => (
              <CashoryInvoiceCard
                key={inv.id}
                title={inv.clientName || inv.invoiceNumber}
                datetime={format(new Date(inv.createdAt), "yyyy-MM-dd HH:mm")}
                amount={inv.total}
                status={mapStatus(inv.status)}
                onPress={() => router.push(`/invoice/${inv.id}`)}
              />
            ))
          )} */}
          </View>
        </ScrollView>
      </Container>
    </SafeArea>
  );
}
