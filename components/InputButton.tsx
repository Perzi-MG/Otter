import { useRef } from 'react';
import { Pressable, TextInput } from 'react-native';

export default function InputButton({ children, placeholder, secure, value, onChangeText, autoCapitalize, rightElement }: { children?: React.ReactNode, placeholder: string, secure: boolean, value: string, onChangeText: (text: string) => void, autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters', rightElement?: React.ReactNode }) {
  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable
      className='w-full h-16 bg-brand-white/40 rounded-full px-6 flex-row items-center border border-gray gap-4'
      onPress={() => inputRef.current?.focus()}
    >
      {children}
      <TextInput
        autoCapitalize={autoCapitalize || 'none'}
        secureTextEntry={secure}
        ref={inputRef}
        className='flex-1 text-brand-black'
        placeholder={placeholder}
        placeholderTextColor='#888'
        value={value}
        onChangeText={onChangeText}
      />
      {rightElement}
    </Pressable>
  )
}