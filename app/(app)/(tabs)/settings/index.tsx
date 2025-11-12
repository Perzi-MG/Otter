import { MenuIcon } from '@/assets/icons';
import OnlyIconButton from '@/components/OnlyIconButton';
import { useAuth } from '@/context/AuthContext';
import { View } from 'react-native';
export default function index() {
  const { auth } = useAuth();
  return (
    <View>
      <OnlyIconButton onPress={() => auth.signOut()}>
        <MenuIcon color='brandBlack' />
      </OnlyIconButton>
    </View>
  )
}