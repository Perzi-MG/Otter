import { ApointmentData, Patient } from "@/assets/types";
import { addDoc, collection } from "firebase/firestore";
import { Alert } from "react-native";

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
        Alert.alert('Error', 'No se pudo guardar el paciente');
        return null
    }
}
export async function addAppointment(appointmentData: ApointmentData | undefined, user: any, db: any) {
    try {
        const appointment: ApointmentData = {
            ...appointmentData,
        };
        await addDoc(collection(db, 'users', user.uid, 'appointments'), appointment);
        return
    } catch (error) {
        Alert.alert('Error', 'Error guardando la cita');
        return null
    }
}