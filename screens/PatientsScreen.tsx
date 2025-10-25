import { MenuIcon, PlusIcon } from '@/assets/icons'
import OnlyIconButton from '@/components/OnlyIconButton'
import PatientButton from '@/components/PatientButton'
import ScreenLayout from '@/components/ScreenLayout'
import { Text, View } from 'react-native'

const patients = [
    { 'id': '1', 'name': 'Miguel', 'description': 'Anorexia' },
    { 'id': '2', 'name': 'Jose', 'description': 'Bulimia' },
    { 'id': '3', 'name': 'Cesar', 'description': 'Perder peso' },
    { 'id': '4', 'name': 'Michel', 'description': 'Otra cosa' }
]
export default function PatientsScreen() {
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
                    {patients.map((patient) => (
                        <PatientButton key={patient.id} name={patient.name} description={patient.description} id={patient.id} />
                    ))}
                </View>
            </View>
        </ScreenLayout>
    )
}