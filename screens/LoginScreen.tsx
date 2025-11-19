import { Lock, User } from '@/assets/icons';
import BlurCard from '@/components/BlurCard';
import InputButton from '@/components/InputButton';
import { LargeButton } from '@/components/LargeButton';
import ScreenLayout from '@/components/ScreenLayout';
import { AppColors } from '@/constants/Colors';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { Link } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          className='bg-black/30 absolute inset-0 justify-center items-center z-50'>
          <ActivityIndicator size="large" color={AppColors.white} />
        </Animated.View>
      )}
      <ScreenLayout>
        <BlurCard intensity={70} px={20}>
          <View className='flex flex-col w-full h-[90%] items-center justify-center gap-4'>

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
              <Link href={"/signup"}>Forgot password?</Link>
            </View>
            <LargeButton color='blue' type='navigate' onPress={signIn} text='Login' />
            <Text>Don't have an account? <Link href={"/signup"} className='font-bold text-blue'>Sign Up</Link></Text>
          </View>
        </BlurCard>
      </ScreenLayout>
    </>
  )
}