import { ArrowBack } from '@/assets/icons';
import BlurCard from '@/components/BlurCard';
import GradientText from '@/components/GradientText';
import InputButton from '@/components/InputButton';
import { LargeButton } from '@/components/LargeButton';
import OnlyIconButton from '@/components/OnlyIconButton';
import ScreenLayout from '@/components/ScreenLayout';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

const formFields = [
    { name: 'firstName', label: 'First name', placeholder: 'First Name', secure: false, halfWidth: true },
    { name: 'lastName', label: 'Last name', placeholder: 'Last Name', secure: false, halfWidth: true },
    // { name: 'email', label: 'Email', placeholder: 'example@gmail.com', secure: false },
    { name: 'birthYear', label: 'Year of birth', placeholder: 'dd/mm/yy', secure: false },
    { name: 'phoneNumber', label: 'Phone number', placeholder: 'xxx-xxx-xxxx', secure: false },
    // { name: 'password', label: 'Password', placeholder: 'Your password', secure: true },
];

export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    birthYear: string;
    phoneNumber: string;
    password: string;
}

export const initialFormData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    birthYear: '',
    phoneNumber: '',
    password: '',
}

export default function SignUpScreen() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        // email: '',
        birthYear: '',
        phoneNumber: '',
        // password: '',
    });

    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const route = useRouter()

    return (
        <ScreenLayout>
            <BlurCard intensity={70} px={20}>
                <View className='w-full h-[90%] flex flex-col justify-start items-center gap-4'>
                    <View className='w-full items-start'>
                        <OnlyIconButton type='back'>
                            <ArrowBack color='aqua' />
                        </OnlyIconButton>
                    </View>
                    <GradientText text='Regístrate' />
                    <Text>
                        Already have an account? <Link className='text-aqua ' href={'/login'}>Login</Link>
                    </Text>

                    <View className='flex flex-row flex-wrap justify-between w-full'>
                        {formFields.map((field) => (
                            <View key={field.name} className={`${field.halfWidth ? 'w-1/2' : 'w-full'} flex flex-col justify-start items-start gap-1`}>
                                <Text className='mt-2'>{field.label}</Text>
                                <InputButton
                                    autoCapitalize='words'
                                    placeholder={field.placeholder}
                                    secure={field.secure}
                                    value={formData[field.name as keyof typeof formData]}
                                    onChangeText={(value) => handleInputChange(field.name, value)}
                                />
                            </View>
                        ))}
                    </View>
                    <View className='w-full flex-1 justify-end items-center'>
                        <LargeButton color='blue' type='navigate' onPress={() => {
                            Object.assign(initialFormData, formData);
                            route.navigate('/email-password');
                        }}>
                            <Text className='text-white text-lg font-bold'>Continue</Text>
                        </LargeButton>
                    </View>
                </View>
            </BlurCard>
        </ScreenLayout>
    )
}

