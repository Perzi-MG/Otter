import { ArrowBack } from '@/assets/icons';
import { patients } from '@/assets/tests';
import OnlyIconButton from '@/components/OnlyIconButton';
import PatientData from '@/components/PatientData';
import SquaredInput from '@/components/SquaredInput';
import { AppColors } from '@/constants/Colors';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PatientIdScreen({ id }: { id: string | string[] }) {
  const insets = useSafeAreaInsets()
  const patient = patients.find((patient) => patient.id === id);
  const styles = StyleSheet.create({
    scroll: {
      alignItems: 'center',
      gap: 20,
      paddingHorizontal: 25,
    }
  })

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll} style={{ backgroundColor: AppColors.lightWhite, paddingBottom: 50 }}>
      <View className='relative flex-row justify-center items-center w-full'>
        <View className='absolute left-0'>
          <OnlyIconButton type='back'>
            <ArrowBack color='aqua' />
          </OnlyIconButton>
        </View>
        <Text className='text-2xl font-bold text-brand-black'>{patient?.name}</Text>
      </View>
      <View className='w-full flex-row flex-wrap justify-between gap-y-4'>
        <View className='w-[48%]'>
          <SquaredInput value={patient?.id} label='Peso (kg)' />
        </View>
        <View className='w-[48%]'>
          <SquaredInput value={patient?.id} label='Altura (cm)' />
        </View>
        <View className='w-[48%]'>
          <SquaredInput value={patient?.id} label='Edad' />
        </View>
        <View className='w-[48%]'>
          <SquaredInput value={patient?.id} label='Género' />
        </View>
        <View className='w-[100%]'>
          <SquaredInput value={patient?.id} label='Actividad Física' />
        </View>
      </View>
      <View className='w-full flex flex-col items-start'>
        <Text className='font-bold text-xl text-brand-black'>Energy Expenditure</Text>
        <PatientData patientData={patient?.id} divider={true} dataName='Mifflin'/>
        <PatientData patientData={patient?.id} divider={true} dataName='Harris-Benedict'/>
        <PatientData patientData={patient?.id} dataName='WHO'/>
        <Text className='place-self-start w-full font-bold text-xl text-brand-black'>Water Inteke</Text>
        <PatientData patientData={patient?.id} dataName='Formula'/>
        <Text className='place-self-start w-full font-bold text-xl text-brand-black'>Fiber Inteke</Text>
        <PatientData patientData={patient?.id} dataName='Formula'/>
        <Text className='place-self-start w-full font-bold text-xl text-brand-black'>Calculations</Text>
        <PatientData patientData={patient?.id} dataName='kcal/kg'/>
        <PatientData patientData={patient?.id} dataName='Protein/kg'/>
        <PatientData patientData={patient?.id} dataName='N2 grams'/>
        <PatientData patientData={patient?.id} dataName='KNP/g N2'/>
      </View>
    </ScrollView>
  )

}
