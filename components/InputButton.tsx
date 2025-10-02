import { useRef } from 'react';
import { Pressable, TextInput } from 'react-native';

export default function InputButton({ children, placeholder, secure }: { children?: React.ReactNode, placeholder: string, secure: boolean }) {
  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable
      className='w-full h-[66px] bg-brand-white/40 rounded-full px-6 flex-row items-center border border-gray'
      onPress={() => inputRef.current?.focus()}
    >
      {children}
      <TextInput
        secureTextEntry={secure}
        ref={inputRef}
        className='flex-1 text-white ml-4'
        placeholder={placeholder}
        placeholderTextColor='#888'
      />
    </Pressable>
  )
}