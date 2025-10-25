import { GradientColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenLayoutProps {
    children: React.ReactNode;
    scroll?: boolean;
    overlay?: React.ReactNode;
}

export default function ScreenLayout({ children, scroll = false, overlay }: ScreenLayoutProps) {
    const insets = useSafeAreaInsets();

    if (scroll) {
        return (
            <LinearGradient
                colors={[GradientColors.skyBlue, GradientColors.pureWhite, GradientColors.lightMintGreen]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    flex: 1,
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                    paddingHorizontal: 25
                }}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    onScrollBeginDrag={() => Keyboard.dismiss()}
                >
                    {children}
                </ScrollView>

                {overlay ? (
                    <View style={{ position: 'absolute', right: 40, bottom: insets.bottom + 70, zIndex: 20 }}>
                        {overlay}
                    </View>
                ) : null}
            </LinearGradient>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <LinearGradient
                colors={[GradientColors.skyBlue, GradientColors.pureWhite, GradientColors.lightMintGreen]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    flex: 1,
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                    paddingHorizontal: 25
                }}
            >
                {children}

                {overlay ? (
                    <View style={{ position: 'absolute', right: 25, bottom: insets.bottom + 12, zIndex: 20 }}>
                        {overlay}
                    </View>
                ) : null}
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}
