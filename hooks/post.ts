import { Patient } from "@/assets/types";
import { addDoc, collection } from "firebase/firestore";

export async function addPatient(patientData: Patient, user: any, db: any) {
    try {
        const patient: Patient = {
            Nombre: patientData.Nombre,
            ApellidoPaterno: patientData.ApellidoPaterno,
            ApellidoMaterno: patientData.ApellidoMaterno,
            FechaNacimiento: patientData.FechaNacimiento,
            Sexo: patientData.Sexo,
            NumeroTelefonico: patientData.NumeroTelefonico,
            Direccion: patientData.Direccion,
            FechaCreacion: new Date().toISOString()
        };
        await addDoc(collection(db, 'users', user.uid, 'patients'), patient);
        return
    } catch (error) {
        console.error('Error guardando paciente:', error);
        return null
    }
}