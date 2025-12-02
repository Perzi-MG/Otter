import { ApointmentData } from '@/assets/types';
import DropdownComponent from '@/components/Dropdown';
import { LargeButton } from '@/components/LargeButton';
import ScreenLayout from '@/components/ScreenLayout';
import { useAuth } from '@/context/AuthContext';
import { usePatientList2 } from '@/hooks/get';
import { addAppointment } from '@/hooks/post';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function SetApointmentScreen() {

  const router = useRouter()
  const { user, db } = useAuth()
  const { patients } = usePatientList2(user, db)
  const [data, setData] = useState<ApointmentData>()
  const [loading, setLoading] = useState(false)

  const handleValueChange = (newValue: any) => {
    setData(prevData => ({
      ...prevData,
      Id_patient: newValue
    }))
  }
  const handleDateChange = (newValue: any) => {
    setData(prevData => ({
      ...prevData,
      date: newValue
    }))
  }
  const handleTimeChange = (newValue: any) => {
    setData(prevData => ({
      ...prevData,
      hour: newValue
    }))
  }

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    addAppointment(data, user, db)
      .then(() =>
        router.push('/home')
      )
      .catch(error => {
        console.error("Error posting appointment data: ", error);
      })
      .finally(() => setLoading(false))
  }

  return (
    <ScreenLayout>
      <View className='flex-1 flex-col gap-10'>
        <Text className='text-3xl font-bold left-28'>Agregar cita</Text>
        <View className='flex-col gap-10'>
          <DropdownComponent
            data={patients}
            placeholder={"Seleccione un paciente"}
            onValueChange={handleValueChange}
            type='list'
          />
          <DropdownComponent
            placeholder='Seleccionar fecha'
            type='date'
            onValueChange={handleDateChange} />
          <DropdownComponent
            placeholder='Seleccionar hora'
            type='time'
            onValueChange={handleTimeChange} />
          <LargeButton type='navigate' color='blue' onPress={handleSubmit} text='Confirmar cita' />
        </View>
      </View>
    </ScreenLayout>
  )
}