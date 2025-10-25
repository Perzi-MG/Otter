import PatientIdScreen from '@/screens/PatientIdScreen';
import { useLocalSearchParams } from 'expo-router';
export default function Patient() {
  const { id } = useLocalSearchParams();
  return (
    <PatientIdScreen id={id} />
  )
}