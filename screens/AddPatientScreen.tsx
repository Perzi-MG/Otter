import { Patient } from '@/assets/types'
import { LargeButton } from '@/components/LargeButton'
import ScreenLayout from '@/components/ScreenLayout'
import SquaredInput from '@/components/SquaredInput'
import { AppColors } from '@/constants/Colors'
import { useAuth } from '@/context/AuthContext'
import { FIRESTORE_DB } from '@/firebaseConfig'
import { useRouter } from 'expo-router'
import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
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
    try {
      const patientData: Patient = {
        Nombre: patient.Nombre,
        ApellidoPaterno: patient.ApellidoPaterno,
        ApellidoMaterno: patient.ApellidoMaterno,
        FechaNacimiento: patient.FechaNacimiento,
        Sexo: patient.Sexo,
        NumeroTelefonico: patient.NumeroTelefonico,
        Direccion: patient.Direccion,
        FechaCreacion: new Date().toISOString()
      };
      await addDoc(collection(db, 'users', user.uid, 'patients'), patientData);
      router.push('/patients');
    } catch (error) {
      console.error('Error guardando paciente:', error);
    } finally {
      setLoading(false);
    }
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
          <Text className="text-3xl font-bold self-center">Añadir Paciente</Text>
          <SquaredInput
            label="Nombre(s)"
            value={patient.Nombre || ''}
            onChangeText={(text) => handleInputChange('Nombre', text)}
          />
          <SquaredInput
            label="Apellido Paterno"
            value={patient.ApellidoPaterno || ''}
            onChangeText={(text) => handleInputChange('ApellidoPaterno', text)}
          />
          <SquaredInput
            label="Apellido Materno"
            value={patient.ApellidoMaterno || ''}
            onChangeText={(text) => handleInputChange('ApellidoMaterno', text)}
          />
          <SquaredInput
            label="Fecha de Nacimiento (YYYY-MM-DD)"
            value={patient.FechaNacimiento || ''}
            onChangeText={(text) => handleInputChange('FechaNacimiento', text)}
          />
          <SquaredInput
            label="Sexo ('Hombre' o 'Mujer')"
            value={patient.Sexo || ''}
            onChangeText={(text) => handleInputChange('Sexo', text)}
          />
          <SquaredInput
            label="Número Telefónico"
            value={patient.NumeroTelefonico?.toString() || ''}
            onChangeText={(text) => handleInputChange('NumeroTelefonico', parseInt(text) || 0)}
            keyboardType="phone-pad"
          />
          <SquaredInput
            label="Dirección"
            value={patient.Direccion || ''}
            onChangeText={(text) => handleInputChange('Direccion', text)}
          />

          <LargeButton onPress={handleSubmit} color='aqua'>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Guardar Paciente</Text>
          </LargeButton>
        </View>
      </ScreenLayout>
    </>
  )
}
