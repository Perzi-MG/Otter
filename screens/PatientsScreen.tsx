import { MenuIcon, PlusIcon } from '@/assets/icons'
import { RawPatient } from '@/assets/types'
import OnlyIconButton from '@/components/OnlyIconButton'
import PatientButton from '@/components/PatientButton'
import ScreenLayout from '@/components/ScreenLayout'
import { useAuth } from '@/context/AuthContext'
import { getPatientData } from '@/hooks/get'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
export default function PatientsScreen() {
    const { user, db } = useAuth();
    const [patientsList, setPatientsList] = useState<RawPatient[]>([]);

    useEffect(() => {
        getPatientData(user, db).then((data) => {
            setPatientsList(data as RawPatient[]);
        })
    }, [user])

    return (
        <ScreenLayout
            scroll
            overlay={
                <OnlyIconButton type='navigate' link='/patients/add'>
                    <PlusIcon color='blue' />
                </OnlyIconButton>
            }
        >
            <View className='w-full flex-1 pt-5 flex-col gap-10'>
                <View className='relative flex-row justify-center items-center w-full'>
                    <Text className='text-2xl font-bold text-brand-black'>Patients</Text>
                    <View className='absolute right-0'>
                        <OnlyIconButton>
                            <MenuIcon color='brandBlack' />
                        </OnlyIconButton>
                    </View>
                </View>
                <View className='flex flex-col gap-5 w-full'>
                    <Text className='text-3xl font-semibold text-brand-black'>Recent patients</Text>
                    {
                        !patientsList && (
                            <Text className='text-2xl font-semibold text-brand-gray'>No patients found. Please add a patient.</Text>
                        )
                    }
                    {patientsList.map((patient, ind) => (
                        <PatientButton
                            key={ind}
                            id={patient.ID_Paciente ?? ''}
                            name={patient.Nombre ?? ''}
                            description={patient.Nombre ?? ''}
                        />
                    ))}
                </View>
            </View>
        </ScreenLayout>
    )
}