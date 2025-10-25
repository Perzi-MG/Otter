import { Patient } from '@/assets/types'
import { LargeButton } from '@/components/LargeButton'
import ScreenLayout from '@/components/ScreenLayout'
import SquaredInput from '@/components/SquaredInput'
import { useState } from 'react'
import { KeyboardAvoidingView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function AddPatientScreen() {
  const insets = useSafeAreaInsets()
  const [patient, setPatient] = useState<Partial<Patient>>({ Sexo: 'Hombre' })
  console.log(patient)
  const handleInputChange = (field: keyof Patient, value: string | number) => {
    setPatient(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // TODO: Validate and save the patient data
    console.log(patient)
    // TODO: Navigate away or show a success message
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={'padding'}
    >
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
    </KeyboardAvoidingView>
  )
}
