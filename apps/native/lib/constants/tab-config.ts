import { MaterialIcons } from "@expo/vector-icons";
import type { SFSymbol } from "expo-symbols";
export type TabName = "index" | "transactions" | "reports" | "profile";

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

export interface TabItem {
  name: TabName;
  label: string;
  sf: { default: SFSymbol; selected: SFSymbol };
  md: MaterialIconName;
}
export const TABS: TabItem[] = [
  {
    name: "index",
    label: "Home",
    sf: { default: "house", selected: "house.fill" },
    md: "home",
  },
  {
    name: "transactions",
    label: "Transaction",
    sf: { default: "newspaper", selected: "newspaper.fill" },
    md: "article",
  },
  {
    name: "reports",
    label: "Reports",
    sf: { default: "chart.pie", selected: "chart.pie.fill" },
    md: "pie-chart", // ✅ FIXED
  },
  {
    name: "profile",
    label: "Profile",
    sf: { default: "person", selected: "person.fill" },
    md: "person",
  },
];
