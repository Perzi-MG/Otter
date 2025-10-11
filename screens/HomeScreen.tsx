import { ArrowBack } from '@/assets/icons';
import { useAuth } from '@/context/AuthContext';
import { Pressable, Text, View } from 'react-native';
export default function HomeScreen() {
  const {auth} = useAuth();
  return (
    <View className='flex-1 justify-center items-center'>
      <Text>HomeScreen</Text>
      <Pressable onPress={() => auth.signOut()}>
        <ArrowBack color='aqua' />
      </Pressable>
    </View>
  )
}