
import { GradientColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenLayoutProps {
    children: React.ReactNode;
}

export default function ScreenLayout({ children }: ScreenLayoutProps) {
    const insets = useSafeAreaInsets();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <LinearGradient
                colors={[GradientColors.skyBlue, GradientColors.pureWhite, GradientColors.lightMintGreen]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, paddingTop: insets.top, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 25 }}
            >
                {children}
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}
