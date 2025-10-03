import { AppColors } from '@/constants/Colors'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import { Text } from 'react-native'
export default function GradientText({text}: {text: string}) {
    return (
        <MaskedView
            maskElement={
                <Text className='text-4xl font-bold text-gray'>
                    {text}
                </Text>
            }
        >
            <LinearGradient
                colors={[AppColors.blue, AppColors.aqua]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text className='text-4xl font-bold text-gray opacity-0'>
                    {text}
                </Text>
            </LinearGradient>
        </MaskedView>
    )
}