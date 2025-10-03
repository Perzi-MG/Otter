import type { ColorKeys as AppColorKeys } from "@/constants/Colors";
import type { GradientColors } from "@/constants/Colors";

type AllColorKeys = AppColorKeys;

export type ButtonProps = React.PropsWithChildren<{
    link?: string;
    type?: "back" | "navigate" | "push";
    color?: "blue" | "transparent-blue" | "transparent-white";
}>;

export type GradientTextProps = React.PropsWithChildren<{
    text: string;
    color1?: AllColorKeys;
    color2?: AllColorKeys;
    color3?: AllColorKeys;
}>;