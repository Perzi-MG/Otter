import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Slot/>
      </AuthProvider>
    </SafeAreaProvider>
  );
}