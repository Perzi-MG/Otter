import { ArrowBack } from '@/assets/icons';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface userData {
  birthDate: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export default function Main() {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const [data, setData] = useState<userData>();

  const getUserData = async () => {
    if (user) {
      const userDocRef = doc(db, 'users', user?.uid);
      const docSnap = await getDoc(userDocRef);
      return docSnap.data();
    }
    return null;
  };

  useEffect(() => {
    getUserData().then((result) => {
      if (result) {
        setData(result as userData);
      } else {
        setData(undefined);
      }
    });
  }, [user]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Welcome to the Main Screen!</Text>
      <Text>User ID: {user?.uid}</Text>
      <Text>Hola {data?.email}</Text>
      <Text>Hola {data?.firstName}</Text>
      <Text>Hola {data?.lastName}</Text>
      <Pressable onPress={() => auth.signOut()}>
        <ArrowBack color='aqua'/>
      </Pressable>
    </View>
  );
}
