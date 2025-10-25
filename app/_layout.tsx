import { AuthProvider } from "@/context/AuthContext";
import { Slot, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function Layout() {
  const segments = useSegments();
  console.log("Current segments:", segments);
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Slot/>
      </AuthProvider>
    </SafeAreaProvider>
  );
}