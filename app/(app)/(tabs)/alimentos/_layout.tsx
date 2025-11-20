import { Stack } from 'expo-router';
export default function AlimentosLayout() {
    return (

        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='[alimentoId]' />
        </Stack>
    )
}