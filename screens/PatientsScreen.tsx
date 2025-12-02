import PatientButton from '@/components/PatientButton'
import ScreenLayout from '@/components/ScreenLayout'
import { PatientsLoader } from '@/components/Skeletons'
import { useAuth } from '@/context/AuthContext'
import { usePatientList2 } from '@/hooks/get'
import { FlatList, Text, View } from 'react-native'

const PatientsScreen = () => {
    const { user, db } = useAuth();
    const { patients, loading } = usePatientList2(user, db)

    return (
        <ScreenLayout
        >

            <View className='w-full flex-1 pt-5 flex-col gap-10 pb-10'>
                <View className='relative flex-row justify-center items-center w-full'>
                    <Text className='text-2xl font-bold text-brand-black'>Pacientes</Text>
                </View>
                {loading ? (
                    <PatientsLoader />
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={patients}
                        renderItem={({ item }) => <PatientButton name={item.label} description={item.label} id={item.value} />}
                        className='flex flex-col gap-5 w-full' />
                )}
            </View>
        </ScreenLayout>
    )
};

export default PatientsScreen;