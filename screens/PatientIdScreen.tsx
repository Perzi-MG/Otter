import { ArrowBack } from '@/assets/icons';
import { Patient } from '@/assets/types';
import OnlyIconButton from '@/components/OnlyIconButton';
import PatientData from '@/components/PatientData';
import ScreenLayout from '@/components/ScreenLayout';
import SquaredInput from '@/components/SquaredInput';
import { useAuth } from '@/context/AuthContext';
import { fetchPatientData } from '@/hooks/get';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function PatientIdScreen({ id }: { id: any }) {
  const { user, db } = useAuth();
  const [patient, setPatient] = useState<Patient>();
  useEffect(() => {
    fetchPatientData(user, db, id)
      .then((data) => {
        setPatient({ ...data });
      })
      .catch(error => {
        console.error("Error fetching patient data: ", error);
      })
  }, [user, db, id]);

  return (
    <ScreenLayout scroll>
      <View className='flex-col gap-7'>
        <View className='relative flex-row justify-center items-center w-full'>
          <View className='absolute left-0'>
            <OnlyIconButton type='back'>
              <ArrowBack color='aqua' />
            </OnlyIconButton>
          </View>
          <Text className='text-2xl font-bold text-brand-black'>{patient?.Nombre}</Text>
        </View>
        <View className='w-full flex-row flex-wrap justify-between gap-y-4'>
          <View className='w-[48%]'>
            <SquaredInput value={patient?.ApellidoMaterno} label='Peso (kg)' />
          </View>
          <View className='w-[48%]'>
            <SquaredInput value={patient?.ApellidoMaterno} label='Altura (cm)' />
          </View>
          <View className='w-[48%]'>
            <SquaredInput value={patient?.ApellidoMaterno} label='Edad' />
          </View>
          <View className='w-[48%]'>
            <SquaredInput value={patient?.ApellidoMaterno} label='Género' />
          </View>
          <View className='w-[100%]'>
            <SquaredInput value={patient?.ApellidoMaterno} label='Actividad Física' />
          </View>
        </View>
        <View className='w-full flex flex-col items-start'>
          <Text className='font-bold text-xl text-brand-black'>Energy Expenditure</Text>
          <PatientData patientData={patient?.ApellidoMaterno} divider={true} dataName='Mifflin' />
          <PatientData patientData={patient?.ApellidoMaterno} divider={true} dataName='Harris-Benedict' />
          <PatientData patientData={patient?.ApellidoMaterno} dataName='WHO' />
          <Text className='place-self-start w-full font-bold text-xl text-brand-black'>Water Inteke</Text>
          <PatientData patientData={patient?.ApellidoMaterno} dataName='Formula' />
          <Text className='place-self-start w-full font-bold text-xl text-brand-black'>Fiber Inteke</Text>
          <PatientData patientData={patient?.ApellidoMaterno} dataName='Formula' />
          <Text className='place-self-start w-full font-bold text-xl text-brand-black'>Calculations</Text>
          <PatientData patientData={patient?.ApellidoMaterno} dataName='kcal/kg' />
          <PatientData patientData={patient?.ApellidoMaterno} dataName='Protein/kg' />
          <PatientData patientData={patient?.ApellidoMaterno} dataName='N2 grams' />
          <PatientData patientData={patient?.ApellidoMaterno} dataName='KNP/g N2' />
        </View>
      </View>
    </ScreenLayout>
  )

}
