import { BlurView } from 'expo-blur'
export default function BlurCard({ children, intensity, py, px }: { children?: React.ReactNode, intensity: number, py?: number, px?: number }) {
  return (
    <BlurView
      tint='systemChromeMaterialLight'
      intensity={intensity}
      className='flex-col w-full h-auto flex justify-center items-center overflow-hidden rounded-3xl'
      style={{ boxShadow: '0 7px 10px rgba(0, 0, 0, 0.1)', paddingVertical: py, paddingHorizontal: px }}
    >
      {children}
    </BlurView>
  )
}