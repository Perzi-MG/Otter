import { useAuth } from '@/context/AuthContext';
import { Stack } from 'expo-router';
export default function Layout() {

    const { signedIn } = useAuth();
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={signedIn}>
                <Stack.Screen name='(tabs)' />
            </Stack.Protected>
            <Stack.Protected guard={!signedIn}>
                <Stack.Screen name='login' />
                <Stack.Screen name='signup' />
                <Stack.Screen name='email-password' />
            </Stack.Protected>
        </Stack>
    )
}