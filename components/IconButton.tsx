import { Pressable } from 'react-native'
export default function IconButton({children}: {children: React.ReactNode}) {
  return (
    <Pressable className='border border-brand-black rounded-full px-6 py-3'>
        {children}
    </Pressable>
  )
}