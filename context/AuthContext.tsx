import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, Auth, User } from 'firebase/auth';
import { getFirestore, Firestore, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_APP } from '@/firebaseConfig';

// Re-define userData interface here for the context
interface userData {
  birthDate: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

// Define la forma de los datos del contexto
interface AuthContextType {
  user: User | null;
  userData: userData | null; // <-- AÑADIDO
  auth: Auth;
  db: Firestore;
  loading: boolean;
}

// Crea el contexto con un valor inicial
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Componente Proveedor que envolverá tu aplicación
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<userData | null>(null); // <-- AÑADIDO
  const [loading, setLoading] = useState(true);

  const auth = getAuth(FIREBASE_APP);
  const db = getFirestore(FIREBASE_APP);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Usuario ha iniciado sesión, buscamos sus datos
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data() as userData);
        }
      } else {
        // Usuario ha cerrado sesión, limpiamos los datos
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  const value = {
    user,
    userData, // <-- AÑADIDO
    auth,
    db,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado para usar fácilmente el contexto en otros componentes
export function useAuth() {
  return useContext(AuthContext);
}