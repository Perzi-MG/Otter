import { CalendarIcon, Notification } from '@/assets/icons';
import BlurCard from '@/components/BlurCard';
import ExpandButton from '@/components/ExpandButton';
import LargeButton2 from '@/components/LargeButton2';
import ScreenLayout from '@/components/ScreenLayout';
import { useAuth } from '@/context/AuthContext';
import { useNearestAppointment } from '@/hooks/useAppointments';
import { Text, View } from 'react-native';
import SetApointmentScreen from './SetApointmentScreen';

export default function HomeScreen() {
  const { auth, userData } = useAuth();
  const { nearestAppointment, patientName, loading } = useNearestAppointment();

  return (
    <ScreenLayout scroll overlay={
      <ExpandButton icon={<CalendarIcon color='aqua' />}>
        <SetApointmentScreen />
      </ExpandButton>
    }>
      <View className='flex-1 pt-5 w-full gap-16'>
        <View className='flex-row justify-between w-full items-center'>
          <View className='flex-col'>
            <Text className='text-2xl font-medium'>Bienvenido,</Text>
            <Text className='text-3xl font-bold'>{userData?.firstName}</Text>
          </View>
        </View>
        <View className='flex-1 gap-10'>
          <BlurCard intensity={30} py={15} px={10}>
            {loading ? (
              <View className='flex-row justify-center items-center gap-5 p-5'>
                <Text className='text-lg font-medium text-gray'>Cargando cita...</Text>
              </View>
            ) : nearestAppointment ? (
              <>
                <View className='flex-row justify-center items-center gap-5'>
                  <View className='w-24 h-24 rounded-full bg-white p-1'>
                    <View className='w-full h-full rounded-full bg-gray' />
                  </View>
                  <View className='flex-col gap-2 flex-1'>
                    <Text className='text-xl font-medium'>Proxima cita</Text>
                    <Text className='text-xl font-extrabold'>
                      {new Date(nearestAppointment.date!).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </Text>
                    <Text className='text-xl font-normal text-blue'>
                      {nearestAppointment.hour}
                    </Text>
                    <Text className='text-xl font-medium'>{patientName || 'Cargando nombre...'}</Text>
                  </View>
                </View>
                <LargeButton2
                  text='Revisar expediente'
                  id={nearestAppointment.Id_patient}
                />
              </>
            ) : (
              <View className='flex-row justify-center items-center gap-5 p-5'>
                <Text className='text-lg font-medium text-gray'>No hay citas próximas</Text>
              </View>
            )}
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