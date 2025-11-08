import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';



export default function NameButton({ name, id, onPress }: { name: string | any, id: string | any, onPress: () => void }) {
    const [pressed, setPressed] = useState('bg-transparent')

    return (
        <Pressable
            className={`w-full flex flex-row justify-between items-center mb-3 py-3 px-5 ${pressed}`}
            onPressIn={() => setPressed('bg-black/10')}
            onPressOut={() => setPressed('bg-transparent')}
            onPress={() => {
                onPress()
            }}
        >
            <View className='flex flex-row gap-5 items-center'>
                <View className='gap-1 flex flex-col justify-star items-start'>
                    <Text className='text-xl font-semibold text-brand-black'>{name}</Text>
                </View>
            </View>
        </Pressable>
    )
}