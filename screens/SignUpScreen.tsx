import { ArrowBack, Eye, EyeOff, Lock, Mail } from '@/assets/icons';
import BlurCard from '@/components/BlurCard';
import GradientText from '@/components/GradientText';
import InputButton from '@/components/InputButton';
import { LargeButton } from '@/components/LargeButton';
import OnlyIconButton from '@/components/OnlyIconButton';
import ScreenLayout from '@/components/ScreenLayout';
import { AppColors } from '@/constants/Colors';
import { FIREBASE_AUTH, FIRESTORE_DB } from '@/firebaseConfig';
import { Link } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const formFields = [
    { name: 'firstName', label: 'Nombre', placeholder: 'Nombre', secure: false, halfWidth: true },
    { name: 'lastName', label: 'Apellido', placeholder: 'Apellido', secure: false, halfWidth: true },
    { name: 'email', label: 'Correo', placeholder: 'ejemplo@gmail.com', secure: false, icon: <Mail color='brandBlack' /> },
    { name: 'password', label: 'Contraseña', placeholder: 'Tu contraseña', secure: true, icon: <Lock color='brandBlack' /> },
];

export default function SignUpScreen() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const auth = FIREBASE_AUTH;
    const db = FIRESTORE_DB;

    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const signUp = async () => {
        if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
            alert('Por favor llena todos los campos');
            return;
        }
        setLoading(true);
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredentials.user;

            const userData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                createdAt: new Date().toISOString()
            };
            await setDoc(doc(db, 'users', user.uid), userData);
        } catch (error: any) {
            console.error(error);
            Alert.alert('Error', 'No se pudo registrar');
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
                    <View className='w-full h-[90%] flex flex-col justify-start items-center gap-4'>
                        <View className='w-full items-start'>
                            <OnlyIconButton type='back'>
                                <ArrowBack color='aqua' />
                            </OnlyIconButton>
                        </View>
                        <View className='items-center gap-2 mb-4'>
                            <GradientText text='Regístrate' />
                            <Text className='text-gray-500 text-base'>
                                Crea tu cuenta para empezar
                            </Text>
                        </View>

                        <View className='flex flex-row flex-wrap justify-between w-full gap-y-4'>
                            {formFields.map((field) => (
                                <View key={field.name} className={`${field.halfWidth ? 'w-[48%]' : 'w-full'} flex flex-col justify-start items-start gap-2`}>
                                    {/* <Text className='ml-2 font-medium text-gray-700'>{field.label}</Text> */}
                                    <InputButton
                                        autoCapitalize={field.name === 'email' ? 'none' : 'words'}
                                        placeholder={field.placeholder}
                                        secure={field.name === 'password' ? !showPassword : field.secure}
                                        value={formData[field.name as keyof typeof formData]}
                                        onChangeText={(value) => handleInputChange(field.name, value)}
                                        rightElement={
                                            field.name === 'password' ? (
                                                <Pressable onPress={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <EyeOff color='brandBlack' /> : <Eye color='brandBlack' />}
                                                </Pressable>
                                            ) : undefined
                                        }
                                    >
                                        {field.icon}
                                    </InputButton>
                                </View>
                            ))}
                        </View>

                        <View className='w-full flex-1 justify-end items-center gap-4'>
                            <LargeButton color='blue' onPress={signUp} text='Registrarse' />
                            <Text className='text-gray-600'>
                                ¿Ya tienes una cuenta? <Link className='text-blue font-bold' href={'/login'}>Inicia sesión</Link>
                            </Text>
                        </View>
                    </View>
                </BlurCard>
            </ScreenLayout>
        </>
    )
}
