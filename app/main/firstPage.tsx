import { ArrowBack } from '@/assets/icons';
import { AppColors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

export default function Main() {
  const { user, userData, auth, loading } = useAuth();

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center bg-black/20'>
        <ActivityIndicator size="large" color={AppColors.aqua} />
      </View>
    );
  }

  // 3. Mostramos los datos directamente desde el contexto
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Welcome to the Main Screen!</Text>
      <Text>User ID: {user?.uid}</Text>
      <Text>Email: {userData?.email}</Text>
      <Text>First Name: {userData?.firstName}</Text>
      <Text>Last Name: {userData?.lastName}</Text>
      <Pressable onPress={() => auth.signOut()}>
        <ArrowBack color='aqua' />
      </Pressable>
    </View>
  );
}
