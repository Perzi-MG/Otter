import { ButtonProps } from "@/assets/types";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function OnlyIconButton({ children, type, link }: ButtonProps) {
    const router = useRouter();
    return (
        <Pressable
            onPress={() => {
                if (type === "back") {
                    router.back();
                } else if (type === "navigate" && link) {
                    router.navigate(link as any);
                } else if (type === "push" && link) {
                    router.push(link as any);
                }
            }}
        >
            {children}
        </Pressable>
    )
}