import { LargeButton } from "@/components/LargeButton";
import ScreenLayout from "@/components/ScreenLayout";
import { useAuth } from "@/context/AuthContext";
import { Text } from "react-native";

export default function SettingsScreen() {
    const { auth } = useAuth();
    return (
        <ScreenLayout>
            <LargeButton color='aqua' onPress={() => auth.signOut()}>
                <Text className="text-white text-xl font-semibold">Sign Out</Text>
            </LargeButton>
        </ScreenLayout>
    )
}