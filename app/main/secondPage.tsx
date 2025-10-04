import { useAuth } from '@/context/AuthContext';
import { Text, View } from 'react-native';
export default function secondPage() {
  const { user, db, auth, loading: authLoading } = useAuth();
  return (
    <View>
      <Text>secondPage</Text>
    </View>
  )
}