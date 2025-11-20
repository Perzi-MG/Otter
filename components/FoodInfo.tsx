import { Text, View } from 'react-native'
export default function FoodInfo({ data, text }: { data: any, text: string }) {
    return (
        <View className='flex-row items-center justify-between border-b border-gray-100 py-3 w-full'>
            <Text className='text-base font-medium text-gray-600 flex-1'>{text}</Text>
            <Text className='text-base font-normal text-gray-900 text-right'>{data}</Text>
        </View>
    )
}