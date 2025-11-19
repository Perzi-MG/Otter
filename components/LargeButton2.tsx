import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text } from 'react-native';



export default function LargeButton2({ text, id }: { text: string | any, id: string | any }) {
    const router = useRouter();
    const [pressed, setPressed] = useState('bg-blue')

    return (
        <Pressable
            className={`w-full flex justify-center items-center py-5 px-5 mt-5 ${pressed}`}
            onPressIn={() => setPressed('bg-dark-blue')}
            onPressOut={() => setPressed('bg-blue')}
            onPress={() => {
                router.navigate({ pathname: `/patients/[patientId]`, params: { id } })
            }}
            style={{ boxShadow: '0 3px 7px rgba(0, 0, 0, 0.1)', borderRadius: 50 }}
        >
            <Text className='text-xl font-medium text-brand-white'>{text}</Text>
        </Pressable>
    )
}