import { Patient } from "@/assets/types";
import { useAuth } from "@/context/AuthContext";
import { useFocusEffect } from "expo-router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

const { user, db } = useAuth();


export async function fetchPatientData(user: any, db: any, id: any) {
  if (!user) return;
  try {
    const patientDocRef = doc(db, 'users', user.uid, 'patients', id);
    const patientSnapshot = await getDoc(patientDocRef);
    const data = patientSnapshot.data() as Patient;
    return data;
  }
  catch (error) {
    console.error("Error fetching patient data: ", error);
    return null;
  }
};

// export async function fetchFoodData(id: any) {
//   try {
//     const foodData = data.find((item) => item.id === id);
//     return foodData;
//   }
//   catch (error) {
//     console.error("Error fetching food data: ", error);
//     return null;
//   }
// }


export const usePatientList2 = (user: any, db: any) => {
  const [patients, setPatients] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useFocusEffect(
    useCallback(() => {

      const getPatients = async () => {
        setError(null);
        if (!user) return;
        try {
          const patientSnapshot = await getDocs(collection(db, 'users', user.uid, 'patients'));
          const formatedPatients = patientSnapshot.docs.map((doc) => {
            const data = doc.data() as any;
            return {
              label: data.Nombre ? data.Nombre.toString() : 'Paciente sin nombre',
              value: doc.id,
            }
          });
          setPatients(formatedPatients);
        } catch (error) {
          console.error("Error fetching patients: ", error);
        } finally {
          setLoading(false);
        }
      };
      getPatients();
    }, [user, db])
  )
  return { patients, loading, error };
};
const usePatientList = (user: any, db: any) => {
  const [patients, setPatients] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPatients = async () => {
      setError(null);
      if (!user) return;
      try {
        const patientSnapshot = await getDocs(collection(db, 'users', user.uid, 'patients'));
        const formatedPatients = patientSnapshot.docs.map((doc) => {
          const data = doc.data() as any;
          return {
            label: data.Nombre ? data.Nombre.toString() : 'Paciente sin nombre',
            value: doc.id,
          }
        });
        setPatients(formatedPatients);
      } catch (error) {
        console.error("Error fetching patients: ", error);
      } finally {
        setLoading(false);
      }
    };
    getPatients();
  }, [user, db]);
  return { patients, loading, error };
};

export default usePatientList;