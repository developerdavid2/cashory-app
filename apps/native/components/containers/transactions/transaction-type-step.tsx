import { View, Text } from "react-native";
import React from "react";
import { TransactionType } from "@/types/reports";
import { GeneralArrowUpRi } from "@/components/ui/icons/GeneralArrowUpRi";
import useAuthTheme from "@/hooks/use-auth-theme";
import { ONBOARDING_FONT_FAMILY } from "@/lib/constants/onboarding-typography";
import { FormFieldLabel } from "@/components/ui/form-field-label";
import { FormFieldPill } from "@/components/ui/form-field-pill";
import { cn } from "heroui-native";

export interface TransactionTypeStepProps {
  transactionType: TransactionType;
}

export default function TransactionTypeStep({
  transactionType,
}: TransactionTypeStepProps) {
  const { isDark } = useAuthTheme();
  const iconColor = isDark ? "#FFFFFF" : "#000000";

  return (
    <View className="flex-col gap-y-2.5 mt-5.5 px-3.75">
      <FormFieldLabel>Select Transaction Type</FormFieldLabel>
      <FormFieldPill className="rounded-2xl bg-brand-flashwhite dark:bg-dark-charcoal-green px-4 py-4 flex-row items-center justify-between">
        <Text
          className="text-sm leading-3.75 text-brand-black dark:text-brand-white"
          style={{ fontFamily: ONBOARDING_FONT_FAMILY.bold }}
        >
          {transactionType === "income" ? "Income" : "Expense"}
        </Text>
        <GeneralArrowUpRi color={iconColor} width={24} height={24} />
      </FormFieldPill>
    </View>
  );
}
