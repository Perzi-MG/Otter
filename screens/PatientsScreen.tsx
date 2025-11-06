import { MenuIcon, PlusIcon } from '@/assets/icons'
import { RawPatient } from '@/assets/types'
import OnlyIconButton from '@/components/OnlyIconButton'
import PatientButton from '@/components/PatientButton'
import ScreenLayout from '@/components/ScreenLayout'
import { useAuth } from '@/context/AuthContext'
import { getPatientData } from '@/hooks/get'
import { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { PatientsLoader } from '@/components/Skeletons'
import IconButton from '@/components/IconButton'

export default function PatientsScreen() {
    const { user, db } = useAuth();
    const [patientsList, setPatientsList] = useState<RawPatient[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPatientData(user, db)
            .then((data) => {
                setPatientsList(data as RawPatient[]);
            })
            .catch(error => {
                console.error("Error fetching patients list: ", error);
            })
            .finally(() => setLoading(false));
    }, [user])

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
                        data={patientsList}
                        renderItem={({ item }) => <PatientButton name={item.Nombre} description={item.Nombre} id={item.ID_Paciente} />}
                        className='flex flex-col gap-5 w-full' />
                )}
            </View>
        </ScreenLayout>
    )
}