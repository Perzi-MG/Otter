import { GradientColors } from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
export default function GradientBackground({ children }: { children: React.ReactNode }) {
    const insets = useSafeAreaInsets();
    return (
        <LinearGradient
            colors={[GradientColors.skyBlue, GradientColors.pureWhite, GradientColors.lightMintGreen]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: insets.top }}
        >
            {children}
        </LinearGradient>
    )
}