import { BlurView } from 'expo-blur'
export default function BlurCard({children}: {children?: React.ReactNode}) {
  return (
    <BlurView
      tint='extraLight'
      intensity={60}
      className='px-8 w-full h-[90%] flex justify-center items-center rounded-[40px] overflow-hidden border border-gray'
    >
      {children}
    </BlurView>
  )
}