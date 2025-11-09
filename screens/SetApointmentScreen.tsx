import { ArrowBack } from '@/assets/icons';
import { ApointmentData } from '@/assets/types';
import DropdownComponent from '@/components/Dropdown';
import OnlyIconButton from '@/components/OnlyIconButton';
import ScreenLayout from '@/components/ScreenLayout';
import { useAuth } from '@/context/AuthContext';
import usePatientList from '@/hooks/get';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function SetApointmentScreen() {
  const { user, db } = useAuth()
  const { patients } = usePatientList(user, db)
  const [data, setData] = useState<ApointmentData>()

  console.log(data)
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

  return (
    <ScreenLayout>
      <View className='flex-1 flex-col gap-10 w-full'>
        <View className='flex-row justify-between items-center w-full'>
          <OnlyIconButton type='back'>
            <ArrowBack color='brandBlack' />
          </OnlyIconButton>
          <Text className='text-3xl font-bold'>Agregar Cita</Text>
        </View>
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
      </View>
    </ScreenLayout>
  )
}