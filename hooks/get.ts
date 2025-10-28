import { Patient } from "@/assets/types";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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
}

export async function getPatientData(user: any, db: any) {
  if (!user) return [];
  try {
    const patientDocRef = collection(db, 'users', user.uid, 'patients');
    const patientSnapshot = await getDocs(patientDocRef);
    const result: { ID_Paciente: string; Nombre: string }[] = patientSnapshot.docs.map((doc) => {
      const data = doc.data() as any;
      return {
        ID_Paciente: doc.id,
        Nombre: data.Nombre.toString()
      }
    })
    return result;
  } catch (error) {
    console.error("Error fetching patients: ", error);
    return [];
  }
}