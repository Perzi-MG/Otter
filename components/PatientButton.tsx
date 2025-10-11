import { ArrowNext } from '@/assets/icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';



export default function PatientButton({ name, description, id }: { name: string, description: string, id:string }) {
    const router = useRouter();

    return (
        <Pressable className='w-full flex flex-row justify-between items-center'
        onPress={() => router.navigate({pathname:`/main/patients/[patientId]`, params: {id}})}
        >
            {/* Aquí irá la imagen de cada paciente */}
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