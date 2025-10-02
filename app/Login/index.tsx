import LoginScreen from '@/screens/LoginScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
export default function Login() {
  return (
    <SafeAreaProvider>
        <LoginScreen/>
    </SafeAreaProvider>
  )
}