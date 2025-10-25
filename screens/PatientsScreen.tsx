import { MenuIcon, PlusIcon } from '@/assets/icons'
import { Patient } from '@/assets/types'
import OnlyIconButton from '@/components/OnlyIconButton'
import PatientButton from '@/components/PatientButton'
import ScreenLayout from '@/components/ScreenLayout'
import { useAuth } from '@/context/AuthContext'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
export default function PatientsScreen() {
    const { user, db } = useAuth();
    const [ patientsList, setPatientsList ] = useState<Patient[]>([]);
    console.log("Patients List: ", patientsList);
    const getPatientData = async () => {
        if (!user) return;
        try {
            const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'patients'));
            const patients = querySnapshot.docs.map((doc) => {
                const allData: Patient = doc.data() as Patient;
                return {
                    ID_Paciente: doc.id,
                    Nombre: allData.Nombre
                };
            });
            setPatientsList(patients);
        } catch (error) {
            console.error("Error fetching patients: ", error);
        }
    }

    useEffect(()=> {
        getPatientData();
    }, [user])

    if (!user) return null;
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