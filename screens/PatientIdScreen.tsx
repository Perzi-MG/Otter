import { ArrowBack } from '@/assets/icons';
import { patients } from '@/assets/tests';
import OnlyIconButton from '@/components/OnlyIconButton';
import ScreenLayout from '@/components/ScreenLayout';
import SquaredInput from '@/components/SquaredInput';
import { Text, View } from 'react-native';
export default function PatientIdScreen({ id }: { id: string | string[] }) {
  const patient = patients.find((patient) => patient.id === id);

  return (
    <ScreenLayout>
      <View className='flex-1 items-center w-full'>
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
            <SquaredInput value={patient?.id} label='Peso (kg)'/>
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
      </View>
    </ScreenLayout>
  )
}