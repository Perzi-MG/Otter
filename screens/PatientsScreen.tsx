import { MenuIcon, PlusIcon } from '@/assets/icons'
import IconButton from '@/components/IconButton'
import OnlyIconButton from '@/components/OnlyIconButton'
import PatientButton from '@/components/PatientButton'
import ScreenLayout from '@/components/ScreenLayout'
import { PatientsLoader } from '@/components/Skeletons'
import { useAuth } from '@/context/AuthContext'
import usePatientList from '@/hooks/get'
import { FlatList, Text, View } from 'react-native'

const PatientsScreen = () => {
    const { user, db } = useAuth();
    const { patients, loading } = usePatientList(user, db)

    return (
        <ScreenLayout
            overlay={
                <IconButton type='navigate' link='/patients/add'>
                    <PlusIcon color='blue' />
                </IconButton>
            }
        >

            <View className='w-full flex-1 pt-5 flex-col gap-10 pb-10'>
                <View className='relative flex-row justify-center items-center w-full'>
                    <Text className='text-2xl font-bold text-brand-black'>Patients</Text>
                    <View className='absolute right-0 pr-7'>
                        <OnlyIconButton>
                            <MenuIcon color='brandBlack' />
                        </OnlyIconButton>
                    </View>
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