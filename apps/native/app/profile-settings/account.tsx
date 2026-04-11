import { useAuthSession, useUpdateProfile } from "@/hooks/use-auth-session";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { Avatar, useThemeColor, useToast } from "heroui-native";
import useAuthTheme from "@/hooks/use-auth-theme";
import ProfileField from "@/components/base/settings/profile-field";
import SafeArea from "@/components/safe-area";
import { Container } from "@/components/container";
import SettingsHeader from "@/components/base/settings/settings-header";
import { router } from "expo-router";

type EditingField = "name" | "phone" | null;

export default function SettingsAccountProfileView() {
  const { toast } = useToast();
  const { data: session } = useAuthSession();
  const user = session?.data?.user as any;

  const { colors, isDark } = useAuthTheme();
  const updateProfile = useUpdateProfile();
  const themeColorBackground = useThemeColor("background");

  // Field values
  const [profileImage, setProfileImage] = useState<string>(user?.image || "");
  const [name, setName] = useState<string>(user?.name || "");
  const [phone, setPhone] = useState<string>(user?.phone || "");
  const [editingField, setEditingField] = useState<EditingField>(null);

  // Save is blocked if a field is open (user hasn't confirmed their edit yet)
  // or if the mutation is in flight
  const isSaveDisabled = editingField !== null || updateProfile.isPending;

  const handleEditStart = (field: EditingField) => setEditingField(field);
  const handleEditDone = () => setEditingField(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photo library to set a profile picture.",
        [{ text: "OK" }]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (isSaveDisabled) return;

    try {
      await updateProfile.mutateAsync({
        name: name.trim(),
        phone: phone.trim(),
        image: profileImage || undefined,
      });

      toast.show({
        variant: "success",
        label: "Profile updated successfully",
      });
    } catch (error) {
      toast.show({
        variant: "danger",
        label:
          error instanceof Error
            ? error.message
            : "Failed to update profile. Please try again.",
      });
    }
  };

  return (
    <SafeArea style={{ backgroundColor: themeColorBackground }}>
      <SettingsHeader title="Profile" />
      <Container className="p-4 md:p-6" isScrollable={false}>
        <View className="flex-col items-center gap-y-6">
          {/* Avatar */}
          <View className="mt-5.5">
            <Pressable
              onPress={pickImage}
              className="items-center justify-center"
            >
              <Avatar className="w-25 h-25" alt="Profile Avatar">
                {profileImage ? (
                  <Avatar.Image source={{ uri: profileImage }} />
                ) : (
                  <Avatar.Fallback>
                    <Ionicons
                      name="person-outline"
                      size={40}
                      color={colors.textSecondary}
                    />
                  </Avatar.Fallback>
                )}
              </Avatar>
              <View
                className="absolute -bottom-1 right-[-10%] w-9.5 h-9.5 rounded-full items-center justify-center"
                style={{
                  backgroundColor: colors.inputBackground,
                  borderWidth: 3,
                  borderColor: colors.screenBackground,
                }}
              >
                <Ionicons name="pencil-outline" size={18} color={colors.icon} />
              </View>
            </Pressable>
          </View>

          {/* Form fields */}
          <View className="flex-col gap-y-3 w-full">
            <ProfileField
              value={name}
              onChangeText={setName}
              isDark={isDark}
              isEditing={editingField === "name"}
              onEditStart={() => handleEditStart("name")}
              onEditDone={handleEditDone}
            />
            <ProfileField
              value={phone}
              onChangeText={setPhone}
              isDark={isDark}
              isEditing={editingField === "phone"}
              onEditStart={() => handleEditStart("phone")}
              onEditDone={handleEditDone}
            />
            {/* Email — fully disabled, no edit icon, no accent border */}
            <ProfileField
              value={user?.email || ""}
              isDark={isDark}
              isDisabled
            />
          </View>

          {/* Save button — disabled while editing or submitting */}
          <Pressable
            onPress={handleSave}
            disabled={isSaveDisabled}
            className="w-full h-15 rounded-[50px] items-center justify-center mt-2"
            style={[
              {
                backgroundColor: isSaveDisabled
                  ? isDark
                    ? "#1a2e2a" // muted dark variant
                    : "#a8c5bc" // muted light variant
                  : isDark
                  ? colors.inputBackground
                  : "#16302B",
              },
            ]}
          >
            <Text
              className="text-[16px] leading-5 text-brand-white text-center"
              style={{
                fontFamily: "PlusJakartaSans_700Bold",
                opacity: isSaveDisabled ? 0.5 : 1,
              }}
            >
              {updateProfile.isPending ? "Saving..." : "Save Changes"}
            </Text>
          </Pressable>
        </View>
      </Container>
    </SafeArea>
  );
}
