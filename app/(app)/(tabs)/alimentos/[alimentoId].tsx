import data from '@/assets/alimentos.json'
import { nutrientGroups } from '@/assets/constants'
import { Alimento } from '@/assets/types'
import FoodInfo from '@/components/FoodInfo'
import ScreenLayout from '@/components/ScreenLayout'
import { useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'



export default function AlimentoId() {
    const { id } = useLocalSearchParams()
    const foodData: Alimento | undefined = data.find((item) => item.id === id)

    if (!foodData) {
        return (
            <ScreenLayout>
                <View className='flex-1 items-center justify-center'>
                    <Text>Alimento no encontrado</Text>
                </View>
            </ScreenLayout>
        )
    }

    return (
        <ScreenLayout scroll>
            <View className='w-full items-center justify-center py-2 overflow-clip gap-5 pb-10'>
                <Text className='text-3xl font-bold text-center'>{foodData.ALIMENTO}</Text>
                <View className='w-full px-4 gap-16'>
                    {nutrientGroups.map((group) => (
                        <View key={group.title} className='gap-2'>
                            <Text className='text-xl font-bold text-blue-600 border-b-2 border-blue-100 pb-1 mb-1'>
                                {group.title}
                            </Text>
                            {group.fields.map((key) => (
                                <FoodInfo
                                    key={key}
                                    data={foodData[key as keyof Alimento]}
                                    text={key}
                                />
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </ScreenLayout>
    )
}