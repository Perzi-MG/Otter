import { ArrowBack } from '@/assets/icons';
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
import { ActivityIndicator, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { initialFormData } from './SignUpScreen';

const formFields = [
    { name: 'email', label: 'Email', placeholder: 'example@gmail.com', secure: false },
    { name: 'password', label: 'Password', placeholder: 'Your password', secure: true },
];


export default function SignUpScreen2() {
    const [formData, setFormData] = useState({
        firstName: initialFormData.firstName,
        lastName: initialFormData.lastName,
        birthYear: initialFormData.birthYear,
        phoneNumber: initialFormData.phoneNumber,
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const db = FIRESTORE_DB;
    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const signUp = async () => {
        setLoading(true);
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredentials.user;

            const userData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                birthYear: formData.birthYear,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                createdAt: new Date()
            };
            await setDoc(doc(db, 'users', user.uid), userData);
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
                    <View className='w-full h-[90%] flex flex-col justify-start items-center gap-4'>
                        <View className='self-start w-full'>
                            <OnlyIconButton type='back'>
                                <ArrowBack color='aqua' />
                            </OnlyIconButton>
                        </View>
                        <GradientText text='Regístrate' />
                        <Text>
                            Already have an account? <Link className='text-aqua ' href={'/login'}>Login</Link>
                        </Text>

                        <View className='flex flex-col justify-between w-full'>
                            {formFields.map((field) => (
                                <View key={field.name} className='flex flex-col justify-start items-start gap-1'>
                                    <Text className='mt-2'>{field.label}</Text>
                                    <InputButton
                                        placeholder={field.placeholder}
                                        secure={field.secure}
                                        value={formData[field.name as keyof typeof formData]}
                                        onChangeText={(value) => handleInputChange(field.name, value)}
                                    />
                                </View>
                            ))}
                        </View>
                        <View className='w-full flex-1 justify-end items-center'>
                            <LargeButton color='blue' type='navigate' onPress={signUp} text='Sign up'/>
                        </View>
                    </View>
                </BlurCard>
            </ScreenLayout>
        </>
    )
}