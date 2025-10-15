import { Patient } from '@/assets/types'
import { LargeButton } from '@/components/LargeButton'
import SquaredInput from '@/components/SquaredInput'
import { useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function AddPatientScreen() {
  const [patient, setPatient] = useState<Partial<Patient>>({ Sexo: 'Hombre' })
  const insets = useSafeAreaInsets()

  const handleInputChange = (field: keyof Patient, value: string | number) => {
    setPatient(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // TODO: Validate and save the patient data
    console.log(patient)
    // TODO: Navigate away or show a success message
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentContainerStyle={{ paddingTop: insets.top, paddingHorizontal: 25, paddingBottom: 50, gap: 15 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' }}>Añadir Paciente</Text>

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
    </ScrollView>
  )
}
