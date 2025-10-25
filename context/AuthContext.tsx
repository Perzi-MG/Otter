import { FIREBASE_APP } from '@/firebaseConfig';
import { Auth, User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { Firestore, doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface userData {
  birthDate: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface AuthContextType {
  user: User | null;
  userData: userData | null;
  auth: Auth;
  db: Firestore;
  signedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<userData | null>(null);
  const [signedIn, isSignedIn] = useState(true);

  const auth = getAuth(FIREBASE_APP);
  const db = getFirestore(FIREBASE_APP);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data() as userData);
        }
        isSignedIn(true);
      } else {
        setUserData(null);
        isSignedIn(false);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const value = {
    user,
    userData,
    auth,
    db,
    signedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  return useContext(AuthContext);
}