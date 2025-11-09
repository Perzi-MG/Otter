import { ButtonProps } from "@/assets/types";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

interface LargeButtonProps extends ButtonProps {
    onPress?: () => void;
}

export function LargeButton({ children, type, link, color, onPress, text }: LargeButtonProps) {
    const router = useRouter();

    let buttonClassName =
        "px-4 py-2 rounded-full w-full h-16 justify-center items-center flex flex-row";
    if (color === "transparent-blue") {
        buttonClassName += " bg-transparent border-2 border-blue";
    } else if (color === "transparent-white") {
        buttonClassName += " bg-transparent border-2 border-gray";
    } else if (color === "blue") {
        buttonClassName += " bg-blue";
    } else if (color === "aqua") {
        buttonClassName += " bg-aqua";
    }

    const handlePress = () => {
        if (type === "back") {
            router.back();
        } else if (type === "navigate" && link) {
            router.navigate(link as any);
        } else if (type === "push" && link) {
            router.push(link as any);
        }
        if (onPress) {
            onPress();
        }
    };

    return (
        <Pressable
            className={buttonClassName}
            onPress={handlePress}
        >
            <Text className='text-white text-lg font-bold'>{text}</Text>
            {children}
        </Pressable>
    );
}