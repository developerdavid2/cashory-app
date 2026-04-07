import { useAuthSession } from "@/hooks/use-auth-session";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import OnboardingSplashContainer from "@/components/containers/onboarding-splash-container";
import Onboardingtemplate from "@/components/templates/onboarding-template";

export default function Index() {
  const router = useRouter();
  const { data: session, isPending } = useAuthSession();

  useEffect(() => {
    if (!isPending && session?.data?.user) {
      const user = session.data.user;
      //TODO: Redirect to home if the user is logged in
    }
  }, [isPending, session, router]);

  return <Onboardingtemplate />;
}
