import { ButtonProps } from '@/assets/types';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native'
export default function IconButton({ children, type, link, onPress }: ButtonProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        if (type === "back") {
          router.back();
        } else if (type === "navigate" && link) {
          router.navigate(link as any);
        } else if (type === "push" && link) {
          router.push(link as any);
        }
        if (onPress) {
          onPress();
        }
      }}
      className='bg-light-white rounded-full px-6 py-6'>
      {children}
    </Pressable>
  )
}