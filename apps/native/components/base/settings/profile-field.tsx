// components/profile-field.tsx
// Fully controlled — no internal isEditing state.
// Parent owns editing state so it can disable Save while any field is open.

import { GeneralEdit } from "@/components/ui/icons/GeneralEdit";
import { InputGroup, TextField } from "heroui-native";
import { Pressable, Text, View } from "react-native";

interface ProfileFieldProps {
  value: string;

  onChangeText?: (text: string) => void;
  isDark: boolean;
  isDisabled?: boolean;
  isEditing?: boolean;
  onEditStart?: () => void;
  onEditDone?: () => void;
}

export default function ProfileField({
  value,

  onChangeText,
  isDark,
  isDisabled = false,
  isEditing = false,
  onEditStart,
  onEditDone,
}: ProfileFieldProps) {
  const iconColor = isDark ? "#FFFFFF" : "#000000";

  // Disabled field — no edit icon, no border accent, visually muted
  if (isDisabled) {
    return (
      <View className="flex-row items-center w-full rounded-2xl bg-brand-white/30 dark:bg-accent-card/8 px-5 py-4 min-h-14">
        <Text
          className="text-[14px] leading-4.5 text-brand-black/40 dark:text-brand-white/30 flex-1"
          style={{ fontFamily: "PlusJakartaSans_400Regular" }}
          numberOfLines={1}
        >
          {value}
        </Text>
      </View>
    );
  }

  // Editing state — shows input with confirm button
  if (isEditing) {
    return (
      <TextField>
        <InputGroup className="w-full h-14 rounded-2xl bg-accent/10 overflow-hidden border border-accent">
          <InputGroup.Input
            value={value}
            onChangeText={onChangeText}
            autoFocus
            className="flex-1 bg-transparent px-5 text-[14px] rounded-2xl text-brand-black dark:text-brand-white"
            style={{ fontFamily: "PlusJakartaSans_400Regular" }}
            placeholderTextColor={isDark ? "#999" : "#888"}
          />
          <InputGroup.Suffix className="pr-4 justify-center">
            <Pressable onPress={onEditDone} hitSlop={8}>
              <View className="w-6 h-6 rounded-xl bg-brand-green-500 dark:bg-accent-card items-center justify-center">
                <Text
                  className="text-body-sm text-brand-white"
                  style={{ fontFamily: "PlusJakartaSans_700Bold" }}
                >
                  ✓
                </Text>
              </View>
            </Pressable>
          </InputGroup.Suffix>
        </InputGroup>
      </TextField>
    );
  }

  // Default read state — shows value with edit icon
  return (
    <View className="flex-row items-center justify-between w-full rounded-2xl bg-brand-white/60 dark:bg-accent-card/15 px-5 py-4 min-h-14">
      <Text
        className="text-[14px] leading-4.5 text-brand-black dark:text-brand-white flex-1"
        style={{ fontFamily: "PlusJakartaSans_400Regular" }}
        numberOfLines={1}
      >
        {value}
      </Text>
      <Pressable onPress={onEditStart} hitSlop={8} className="ml-2">
        <GeneralEdit color={iconColor} width={20} height={20} />
      </Pressable>
    </View>
  );
}
