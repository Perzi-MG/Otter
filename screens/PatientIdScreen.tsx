import { ArrowBack } from '@/assets/icons';
import { Patient } from '@/assets/types';
import { LargeButton } from '@/components/LargeButton';
import OnlyIconButton from '@/components/OnlyIconButton';
import ScreenLayout from '@/components/ScreenLayout';
import { PatientDataLoader } from '@/components/Skeletons';
import SquaredInput from '@/components/SquaredInput';
import { useAuth } from '@/context/AuthContext';
import { fetchPatientData } from '@/hooks/get';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';

export default function PatientIdScreen({ id }: { id: any }) {
  const { user, db } = useAuth();
  const [patient, setPatient] = useState<Patient>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPatientData(user, db, id)
      .then((data) => {
        setPatient({ ...data });
      })
      .catch(error => {
        console.error("Error fetching patient data: ", error);
      })
      .finally(() => setLoading(false));
  }, [user, db, id]);

  const handleUpdate = async () => {
    if (!user || !id || !patient) return;
    setSaving(true);
    try {
      const patientDocRef = doc(db, 'users', user.uid, 'patients', id);
      await updateDoc(patientDocRef, {
        ...patient,
        Peso: Number(patient.Peso) || 0,
        Altura: Number(patient.Altura) || 0,
        Edad: Number(patient.Edad) || 0,
      });
      Alert.alert('Éxito', 'Datos actualizados correctamente');
    } catch (error) {
      console.error("Error updating patient: ", error);
      Alert.alert('Error', 'No se pudieron actualizar los datos');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScreenLayout scroll>
      {loading ? (
        <PatientDataLoader />
      ) : (
        <View className='flex-col gap-7 pb-10'>
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
              <SquaredInput
                value={patient?.Peso?.toString()}
                label='Peso (kg)'
                onChangeText={(text) => setPatient({ ...patient!, Peso: Number(text) })}
                keyboardType='numeric'
              />
            </View>
            <View className='w-[48%]'>
              <SquaredInput
                value={patient?.Altura?.toString()}
                label='Altura (cm)'
                onChangeText={(text) => setPatient({ ...patient!, Altura: Number(text) })}
                keyboardType='numeric'
              />
            </View>
            <View className='w-[48%]'>
              <SquaredInput
                value={patient?.Edad?.toString()}
                label='Edad'
                onChangeText={(text) => setPatient({ ...patient!, Edad: Number(text) })}
                keyboardType='numeric'
              />
            </View>
            <View className='w-[48%]'>
              <SquaredInput
                value={patient?.Sexo}
                label='Género'
                onChangeText={(text) => setPatient({ ...patient!, Sexo: text as 'Hombre' | 'Mujer' })}
              />
            </View>
            <View className='w-[100%]'>
              <SquaredInput
                value={patient?.ActividadFisica}
                label='Actividad Física'
                onChangeText={(text) => setPatient({ ...patient!, ActividadFisica: text })}
              />
            </View>
          </View>

          <View className='w-full'>
            <LargeButton
              text={saving ? 'Guardando...' : 'Guardar Cambios'}
              onPress={handleUpdate}
              color='blue'
            />
          </View>

          {/* <View className='w-full flex flex-col items-start opacity-50'>
            <Text className='font-bold text-xl text-brand-black'>Energy Expenditure</Text>
            <PatientData patientData={undefined} divider={true} dataName='Mifflin' />
            <PatientData patientData={undefined} divider={true} dataName='Harris-Benedict' />
            <PatientData patientData={undefined} dataName='WHO' />
            <Text className='place-self-start w-full font-bold text-xl text-brand-black'>Water Inteke</Text>
            <PatientData patientData={undefined} dataName='Formula' />
            <Text className='place-self-start w-full font-bold text-xl text-brand-black'>Fiber Inteke</Text>
            <PatientData patientData={undefined} dataName='Formula' />
            <Text className='place-self-start w-full font-bold text-xl text-brand-black'>Calculations</Text>
            <PatientData patientData={undefined} dataName='kcal/kg' />
            <PatientData patientData={undefined} dataName='Protein/kg' />
            <PatientData patientData={undefined} dataName='N2 grams' />
            <PatientData patientData={undefined} dataName='KNP/g N2' />
          </View> */}
        </View>
      )}
    </ScreenLayout>
  )
}
