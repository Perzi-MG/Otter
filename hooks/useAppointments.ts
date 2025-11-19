import { ApointmentData, Patient } from "@/assets/types";
import { useAuth } from "@/context/AuthContext";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useNearestAppointment = () => {
    const { user, db } = useAuth();
    const [nearestAppointment, setNearestAppointment] = useState<ApointmentData | null>(null);
    const [patientName, setPatientName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const appointmentsRef = collection(db, 'users', user.uid, 'appointments');

        const unsubscribe = onSnapshot(appointmentsRef, async (snapshot) => {
            const appointments = snapshot.docs.map(doc => doc.data() as ApointmentData);

            const now = new Date();

            const upcomingAppointments = appointments.filter(app => {
                if (!app.date || !app.hour) return false;

                const appDate = new Date(app.date);
                const [hours, minutes] = app.hour.split(':').map(Number);

                // Combine date from app.date and time from app.hour
                // Note: app.date is ISO string (UTC), new Date(app.date) converts to local time
                // app.hour is local time string "HH:MM"
                appDate.setHours(hours, minutes, 0, 0);

                return appDate >= now;
            });

            upcomingAppointments.sort((a, b) => {
                const dateA = new Date(a.date!);
                const [hoursA, minutesA] = a.hour!.split(':').map(Number);
                dateA.setHours(hoursA, minutesA, 0, 0);

                const dateB = new Date(b.date!);
                const [hoursB, minutesB] = b.hour!.split(':').map(Number);
                dateB.setHours(hoursB, minutesB, 0, 0);

                return dateA.getTime() - dateB.getTime();
            });

            if (upcomingAppointments.length > 0) {
                const next = upcomingAppointments[0];

                // Only update if it's different to avoid loops/flicker, though objects might be new refs
                // Simple check:
                if (JSON.stringify(next) !== JSON.stringify(nearestAppointment)) {
                    setNearestAppointment(next);

                    // Fetch patient name
                    if (next.Id_patient) {
                        try {
                            const patientDocRef = doc(db, 'users', user.uid, 'patients', next.Id_patient);
                            const patientSnap = await getDoc(patientDocRef);
                            if (patientSnap.exists()) {
                                const patientData = patientSnap.data() as Patient;
                                setPatientName(`${patientData.Nombre} ${patientData.ApellidoPaterno || ''}`);
                            } else {
                                setPatientName("Paciente desconocido");
                            }
                        } catch (e) {
                            console.error("Error fetching patient", e);
                            setPatientName("Error al cargar");
                        }
                    }
                }
            } else {
                setNearestAppointment(null);
                setPatientName(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user, db]);

    return { nearestAppointment, patientName, loading };
};
