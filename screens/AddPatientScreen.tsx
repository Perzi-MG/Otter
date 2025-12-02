import { Patient } from '@/assets/types'
import Dropdown from '@/components/Dropdown'
import { LargeButton } from '@/components/LargeButton'
import ScreenLayout from '@/components/ScreenLayout'
import SquaredInput from '@/components/SquaredInput'
import { AppColors } from '@/constants/Colors'
import { Sexo } from '@/constants/Lists'
import { useAuth } from '@/context/AuthContext'
import { FIRESTORE_DB } from '@/firebaseConfig'
import { addPatient } from '@/hooks/post'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Alert, Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'


export default function AddPatientScreen() {
  const db = FIRESTORE_DB;
  const router = useRouter();
  const { user } = useAuth();
  const [patient, setPatient] = useState<Partial<Patient>>({ Sexo: 'Hombre' })
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof Patient, value: string | number) => {
    setPatient(prev => ({ ...prev, [field]: value }))
  }

  if (!user) {
    return null
  }

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    if (!patient.Nombre || !patient.ApellidoPaterno || !patient.FechaNacimiento || !patient.Sexo || !patient.NumeroTelefonico || !patient.Direccion || patient.ApellidoMaterno) {
      Alert.alert('Alerta', 'Por favor complete todos los campos obligatorios');
      setLoading(false);
      return;
    }
    addPatient(patient, user, db)
      .then(() =>
        router.push('/(app)/(tabs)/patients')
      )
      .catch(error => {
        console.error("Error fetching patient data: ", error);
      })
      .finally(() => {setLoading(false), setPatient})
  }

  return (
    <>
      {loading && (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          className='bg-black/30 absolute inset-0 justify-center items-center z-50'>
          <ActivityIndicator size="large" color={AppColors.white} />
        </Animated.View>
      )}
      <ScreenLayout scroll>

        <View className='flex-1 flex-col justify-center gap-5 mt-10 mb-16'>
          <Text className="text-3xl font-bold self-center">Añadir paciente</Text>
          <SquaredInput
            label="Nombre(s)"
            value={patient.Nombre || ''}
            onChangeText={(text) => handleInputChange('Nombre', text)}
          />
          <SquaredInput
            label="Primer apellido"
            value={patient.ApellidoPaterno || ''}
            onChangeText={(text) => handleInputChange('ApellidoPaterno', text)}
          />
          <SquaredInput
            label="Segundo apellido"
            value={patient.ApellidoMaterno || ''}
            onChangeText={(text) => handleInputChange('ApellidoMaterno', text)}
          />
          <Dropdown placeholder='Fecha de nacimiento' type='date' onValueChange={(text) => handleInputChange('FechaNacimiento', text)} />
          <Dropdown
            maxHeight={180}
            scrollEnabled={false}
            placeholder='Sexo'
            type='list'
            data={Sexo}
            onValueChange={(text) => handleInputChange('Sexo', text)} />
          <SquaredInput
            label="Número telefónico"
            value={patient.NumeroTelefonico?.toString() || ''}
            onChangeText={(text) => handleInputChange('NumeroTelefonico', text)}
            keyboardType="phone-pad"
          />
          <SquaredInput
            label="Dirección"
            value={patient.Direccion || ''}
            onChangeText={(text) => handleInputChange('Direccion', text)}
          />

          <LargeButton onPress={handleSubmit} color='aqua' text='Guardar paciente' />
        </View>
      </ScreenLayout>
    </>
  )
}