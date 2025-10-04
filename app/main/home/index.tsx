import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function HomeIndex() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla Principal de Home</Text>
      <Link href="/main/home/1">Ir al perfil 1</Link>
      <Link href="/main/home/2">Ir al perfil 2</Link>
      <Link href="/main/home/3">Ir al perfil 3</Link>
    </View>
  );
}
