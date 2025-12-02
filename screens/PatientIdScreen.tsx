import { ArrowBack } from '@/assets/icons';
import { Patient } from '@/assets/types';
import BlurCard from '@/components/BlurCard';
import { LargeButton } from '@/components/LargeButton';
import OnlyIconButton from '@/components/OnlyIconButton';
import ScreenLayout from '@/components/ScreenLayout';
import { PatientDataLoader } from '@/components/Skeletons';
import SquaredInput from '@/components/SquaredInput';
import { calculateDietosynthetic, calculateIMC, calculateTDEE, getIMCClassification } from '@/constants/Nutrition';
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
                label='Actividad física'
                onChangeText={(text) => setPatient({ ...patient!, ActividadFisica: text })}
              />
            </View>
          </View>

          <View className='w-full'>
            <LargeButton
              text={saving ? 'Guardando...' : 'Guardar cambios'}
              onPress={handleUpdate}
              color='blue'
            />
          </View>

          {/* Nutrition Data Section */}
          {patient && (patient.Peso || 0) > 0 && (patient.Altura || 0) > 0 ? (
            <View className='w-full mt-4 p-4 bg-gray-50 rounded-xl'>
              <Text className='text-xl font-bold text-brand-black mb-4'>Análisis nutricional</Text>
              <View className='mb-6'>
                <Text className='text-lg font-semibold text-gray-700 mb-2'>IMC (Índice de Masa Corporal)</Text>
                <BlurCard intensity={30} py={20} px={10}>

                  <View>
                    <Text className='text-7xl font-bold'>
                      {calculateIMC(patient.Peso || 0, patient.Altura || 0)}
                    </Text>
                  </View>
                  <View className='bg-blue-100 px-3 py-1 rounded-full'>
                    <Text className='text-blue-800 font-medium'>
                      {getIMCClassification(calculateIMC(patient.Peso || 0, patient.Altura || 0))}
                    </Text>
                  </View>
                </BlurCard>
              </View>
              <BlurCard intensity={30} py={20} px={10}>
                <Text className='text-lg font-semibold text-gray-700 mb-2'>Requerimiento estimado</Text>
                <View className='p-4'>
                  <View className='flex-row justify-between items-end mb-4 border-b border-gray-100 pb-4'>
                    <Text className='text-gray-600'>Calorías Diarias (TDEE)</Text>
                    <Text className='text-2xl font-bold text-brand-black'>
                      {calculateTDEE(patient.Peso || 0, patient.Altura || 0, patient.Edad || 25, patient.Sexo || 'Hombre', patient.ActividadFisica || 'Sedentario')} <Text className='text-sm font-normal text-gray-500'>kcal</Text>
                    </Text>
                  </View>

                  <Text className='text-sm text-gray-500 mb-3'>Distribución Sugerida (50% C / 20% P / 30% G)</Text>

                  {(() => {
                    const tdee = calculateTDEE(patient.Peso || 0, patient.Altura || 0, patient.Edad || 25, patient.Sexo || 'Hombre', patient.ActividadFisica || 'Sedentario');
                    const diet = calculateDietosynthetic(tdee, { carbsPercentage: 50, proteinPercentage: 20, fatPercentage: 30 });

                    return (
                      <View className='gap-3'>
                        <View className='flex-row justify-between items-center'>
                          <View className='flex-row items-center gap-2'>
                            <View className='w-3 h-3 rounded-full bg-green-500' />
                            <Text className='text-gray-700'>Carbohidratos</Text>
                          </View>
                          <View className='items-end'>
                            <Text className='font-bold'>{diet.carbs.grams}g</Text>
                            <Text className='text-xs text-gray-500'>{diet.carbs.calories} kcal</Text>
                          </View>
                        </View>

                        <View className='flex-row justify-between items-center'>
                          <View className='flex-row items-center gap-2'>
                            <View className='w-3 h-3 rounded-full bg-red-500' />
                            <Text className='text-gray-700'>Proteínas</Text>
                          </View>
                          <View className='items-end'>
                            <Text className='font-bold'>{diet.protein.grams}g</Text>
                            <Text className='text-xs text-gray-500'>{diet.protein.calories} kcal</Text>
                          </View>
                        </View>

                        <View className='flex-row justify-between items-center'>
                          <View className='flex-row items-center gap-2'>
                            <View className='w-3 h-3 rounded-full bg-yellow-500' />
                            <Text className='text-gray-700'>Grasas</Text>
                          </View>
                          <View className='items-end'>
                            <Text className='font-bold'>{diet.fat.grams}g</Text>
                            <Text className='text-xs text-gray-500'>{diet.fat.calories} kcal</Text>
                          </View>
                        </View>
                      </View>
                    );
                  })()}
                </View>
              </BlurCard>
            </View>
          ) : (
            <View className='w-full mt-4 p-4 bg-gray-50 rounded-xl items-center'>
              <Text className='text-gray-500'>Completa los datos del paciente para ver el análisis nutricional.</Text>
            </View>
          )}
        </View>
      )}
    </ScreenLayout>
  )
}
