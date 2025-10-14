import { ArrowBack } from '@/assets/icons';
import { patients } from '@/assets/tests';
import OnlyIconButton from '@/components/OnlyIconButton';
import ScreenLayout from '@/components/ScreenLayout';
import SquaredInput from '@/components/SquaredInput';
import { ScrollView, Text, View } from 'react-native';

export default function PatientIdScreen({ id }: { id: string | string[] }) {
  const patient = patients.find((patient) => patient.id === id);

  return (
    <ScreenLayout>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', gap: 20, paddingVertical: 20 }}>
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
          <View className='w-full flex-row justify-between border border-transparent border-b-aqua/30 p-6'>
            <Text className='text-gray font-normal text-base'>Mifflin</Text>
            <Text className='font-semibold'>{patient?.id} kcal</Text>
          </View>
          <View className='w-full flex-row justify-between border border-transparent border-b-aqua/30 p-6'>
            <Text className='text-gray font-normal text-base'>Harris-Benedict</Text>
            <Text className='font-semibold'>{patient?.id} kcal</Text>
          </View>
          <View className='w-full flex-row justify-between p-6'>
            <Text className='text-gray font-normal text-base'>WHO</Text>
            <Text className='font-semibold'>{patient?.id} kcal</Text>
          </View>
          <Text className='place-self-start w-full font-bold text-xl text-brand-black'>Water Inteke</Text>
          <View className='w-full flex-row justify-between p-6'>
            <Text className='text-gray font-normal text-base'>Formula</Text>
            <Text className='font-semibold'>{patient?.id} kcal</Text>
          </View>
          <Text className='place-self-start w-full font-bold text-xl text-brand-black'>Water Inteke</Text>
          <View className='w-full flex-row justify-between p-6'>
            <Text className='text-gray font-normal text-base'>Formula</Text>
            <Text className='font-semibold'>{patient?.id} kcal</Text>
          </View>
          <Text className='place-self-start w-full font-bold text-xl text-brand-black'>Water Inteke</Text>
          <View className='w-full flex-row justify-between p-6'>
            <Text className='text-gray font-normal text-base'>Formula</Text>
            <Text className='font-semibold'>{patient?.id} kcal</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  )
}
