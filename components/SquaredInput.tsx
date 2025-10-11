import { useRef } from 'react';
import { Text, TextInput, View } from 'react-native';

export default function SquaredInput({ value, label, children }: { value: string | undefined, label: string | undefined, children?: React.ReactNode}) {
    const inputRef = useRef<TextInput>(null);

    return (
        <View className='flex-col gap-1'>
            <Text className='text-brand-black text-md'>{label}</Text>
            <View
                className='flex w-full h-16 bg-white rounded-lg px-6 items-start justify-center border border-aqua'
            >
                {children}
                <TextInput
                    className='w-full h-full'
                    secureTextEntry={false}
                    ref={inputRef}
                    placeholder={value}
                    placeholderTextColor='#888'
                    value={value}
                />
            </View>
        </View>
    )
}