import { Apple, Facebook, Google, Lock, Phone, User } from '@/assets/icons';
import BlurCard from '@/components/BlurCard';
import IconButton from '@/components/IconButton';
import InputButton from '@/components/InputButton';
import { LargeButton } from '@/components/LargeButton';
import ScreenLayout from '@/components/ScreenLayout';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { Link, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';

export const LoginIcons = [
  <Google key="google" color='brandBlack' />,
  <Facebook key="facebook" color='brandBlack' />,
  <Apple key="apple" color='brandBlack' />,
  <Phone key="phone" color='brandBlack' />,
]

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const route = useRouter();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      route.navigate('/main/firstPage');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenLayout>
      <BlurCard>
        <View className='flex flex-col w-full items-center justify-center gap-5'>

          <Image source={require('../assets/images/Logo.png')} className='w-52 h-52' />
          <Text className='text-4xl font-bold text-gray'>Inicia sesión</Text>
          <Text>Ingresa tu correo y contraseña</Text>
          <View className='flex flex-col gap-4'>
            <InputButton
              placeholder='Correo electrónico'
              secure={false}
              value={email}
              onChangeText={setEmail}
            >
              <User color='gray' />
            </InputButton>
            <InputButton
              placeholder='Contraseña'
              secure={true}
              value={password}
              onChangeText={setPassword}
            >
              <Lock color='gray' />
            </InputButton>
          </View>
          <View className="flex flex-row justify-between w-full px-2">
            <Text>Remember me</Text>
            <Link href={"/auth/signup"}>Forgot password?</Link>
          </View>
          <LargeButton color='blue' type='navigate' onPress={signIn}>
            <Text className='text-white text-lg font-bold'>Login</Text>
          </LargeButton>
          <View className="flex flex-row items-center w-full my-2 gap-3">
            <View className='flex-1 h-[2px] bg-black/30 rounded-full' />
            <Text className="mx-2 text-gray-500 font-semibold">Or login with</Text>
            <View className='flex-1 h-[2px] bg-black/30 rounded-full' />
          </View>
          <View className='flex flex-row justify-between w-full items-center'>
            {LoginIcons.map((icon) => (
              <IconButton key={icon.key}>
                {icon}
              </IconButton>
            ))}
          </View>
          <Text>Don't have an account? <Link href={"/auth/signup"} className='font-bold text-blue'>Sign Up</Link></Text>
        </View>
      </BlurCard>
    </ScreenLayout>
  )
}