import { ArrowNext } from '@/assets/icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';



export default function PatientButton({ name, description, id }: { name: string | any, description: string | any, id: string | any }) {
    const router = useRouter();
    const [pressed, setPressed] = useState('bg-transparent')

    return (
        <Pressable
            className={`w-full flex flex-row justify-between items-center mb-3 py-3 px-5 ${pressed}`}
            onPressIn={() => setPressed('bg-black/10')}
            onPressOut={() => setPressed('bg-transparent')}
            onPress={() => {
                router.navigate({ pathname: `/patients/[patientId]`, params: { id } })
            }}
            style={{ boxShadow: '0 3px 7px rgba(0, 0, 0, 0.1)', borderRadius: 20}}
        >
            <View className='flex flex-row gap-5 items-center'>
                <View className='w-14 h-14 rounded-full bg-gray' />
                <View className='gap-1 flex flex-col justify-star items-start'>
                    <Text className='text-xl font-semibold text-brand-black'>{name}</Text>
                    <Text className='text-md font-light text-gray'>{description}</Text>
                </View>
            </View>
            <ArrowNext color='gray' />
        </Pressable>
    )
}