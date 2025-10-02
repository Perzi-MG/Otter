import { BlurView } from 'expo-blur'
export default function BlurCard({children}: {children?: React.ReactNode}) {
  return (
    <BlurView
      tint='extraLight'
      intensity={60}
      className='px-6 w-[90%] h-[90%] flex justify-center items-center rounded-3xl overflow-hidden border border-gray'
    >
      {children}
    </BlurView>
  )
}