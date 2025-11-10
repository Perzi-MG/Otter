import { CalendarIcon, MenuIcon, Notification } from '@/assets/icons';
import BlurCard from '@/components/BlurCard';
import ExpandButton from '@/components/ExpandButton';
import OnlyIconButton from '@/components/OnlyIconButton';
import ScreenLayout from '@/components/ScreenLayout';
import { useAuth } from '@/context/AuthContext';
import { Pressable, Text, View } from 'react-native';
import SetApointmentScreen from './SetApointmentScreen';
export default function HomeScreen() {
  const { auth, userData } = useAuth();
  return (
    <ScreenLayout scroll overlay={
      <ExpandButton icon={<CalendarIcon color='aqua'/>}>
        <SetApointmentScreen/>
      </ExpandButton>
      // <IconButton type='navigate' link='/home/setApointment'>
      //   <CalendarIcon color='blue' />
      // </IconButton>
    }>
      <View className='flex-1 pt-5 w-full gap-16'>
        <View className='flex-row justify-between w-full items-center'>
          <View className='flex-col'>
            <Text className='text-2xl font-medium'>Bienvenido,</Text>
            <Text className='text-3xl font-bold'>{userData?.firstName}</Text>
          </View>
          <OnlyIconButton onPress={() => auth.signOut()}>
            <MenuIcon color='brandBlack' />
          </OnlyIconButton>
        </View>
        <View className='flex-1 gap-10'>
          <BlurCard intensity={30} py={15} px={10}>
            <View className='flex-row justify-center items-center gap-5'>
              <View className='w-24 h-24 rounded-full bg-white p-1'>
                <View className='w-full h-full rounded-full bg-gray' />
              </View>
              <View className='flex-col gap-2 flex-1'>
                <Text className='text-xl font-medium'>Proxima cita</Text>
                <Text className='text-xl font-extrabold'>31-10-2025</Text>
                <Text className='text-xl font-normal text-blue'>19:00 PM</Text>
                <Text className='text-xl font-medium'>César Núñez</Text>
              </View>
            </View>
            <Pressable className='bg-blue rounded-full px-8 py-4 mt-5'>
              <Text className='text-white text-lg font-semibold'>Revisar expediente</Text>
            </Pressable>
          </BlurCard>
          <View className='flex-col gap-1'>
            <Text className='font-bold text-lg'>Resumen rápido</Text>
            <BlurCard intensity={30} py={20} px={15}>
              <View className='flex-row items-center w-full justify-between'>
                <View className='flex-col gap-1'>
                  <Text className='text-3xl font-bold'>5</Text>
                  <Text className='text-lg font-normal text-gray'>Pacientes activos</Text>
                </View>
                <View className='h-full bg-gray/20 w-0.5' />
                <View className='flex-col gap-1'>
                  <Text className='text-3xl font-bold'>-3.5</Text>
                  <Text className='text-lg font-normal text-gray'>Peso promedio bajado</Text>
                </View>
              </View>
            </BlurCard>
          </View>
          <View className='flex-col gap-3'>
            <Text className='font-bold text-lg'>Notificaciones importantes</Text>
            <BlurCard intensity={30} py={20} px={10}>
              <View className='w-full flex-row items-center gap-3'>
                <Notification color='brandBlack' />
                <Text>Notificacion</Text>
              </View>
            </BlurCard>
            <BlurCard intensity={30} py={20} px={10}>
              <View className='w-full flex-row items-center gap-3'>
                <Notification color='brandBlack' />
                <Text>Notificacion</Text>
              </View>
            </BlurCard>
          </View>
        </View>
      </View>
    </ScreenLayout>
  )
}