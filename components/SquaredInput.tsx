import { BlurView } from 'expo-blur';
import { useRef } from 'react';
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';

export default function SquaredInput({ value, label, children, onChangeText, keyboardType }: { value: any, label: string | undefined, children?: React.ReactNode, onChangeText?: ((text: string) => void), keyboardType?: KeyboardTypeOptions }) {
    const inputRef = useRef<TextInput>(null);

    return (
        <View className='flex-col gap-1'>
            <Text className='text-brand-black text-md'>{label}</Text>
            <BlurView
                tint='systemChromeMaterialLight'
                intensity={70}
                className='flex-col w-full h-16 flex justify-center items-center overflow-hidden rounded-3xl border border-blue px-5'
            >

                {children}
                <TextInput
                    className='w-full h-full'
                    secureTextEntry={false}
                    ref={inputRef}
                    placeholderTextColor='#888'
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                />
            </BlurView>
        </View>
    )
}