import { User } from '@/assets/icons';
import BlurCard from '@/components/BlurCard';
import InputButton from '@/components/InputButton';
import { GradientColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[GradientColors.skyBlue, GradientColors.pureWhite, GradientColors.lightMintGreen]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: insets.top }}
    >
        <BlurCard>
            <Image source={require('../assets/images/Logo.png')} className='w-52 h-52'/>
            <Text className='text-4xl font-bold text-gray'>Inicia sesión</Text>
            <Text>Ingresa tu correo y contraseña</Text>
            <InputButton placeholder='Correo electrónico' secure={false}>
            <User color='gray' />
            </InputButton>
        </BlurCard>
    </LinearGradient>
  )
}