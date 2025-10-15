import { Text, View } from 'react-native';
export default function PatientData({ patientData, dataName, divider }: { patientData: any, dataName: string, divider?: boolean }) {
    return (
        <>
            <View className='w-full flex-row justify-between p-6'>
                <Text className='text-gray font-normal text-base'>{dataName}</Text>
                <Text className='font-semibold'>{patientData} kcal</Text>
            </View>
            {divider && <View className='border border-transparent border-b-aqua/40 w-full' />
            }
        </>
    )
}