import type { ColorKeys as AppColorKeys } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AllColorKeys = AppColorKeys;

export type ButtonProps = React.PropsWithChildren<{
  link?: string;
  type?: "back" | "navigate" | "push";
  color?: "blue" | "transparent-blue" | "transparent-white" | "aqua";
  onPress?: () => void;
  text?: string;
}>;

export type GradientTextProps = React.PropsWithChildren<{
  text: string;
  color1?: AllColorKeys;

  color2?: AllColorKeys;
  color3?: AllColorKeys;
}>;

export const insets = useSafeAreaInsets()

export interface Patient {
  ID_Paciente?: string;
  Nombre?: string;
  ApellidoPaterno?: string;
  ApellidoMaterno?: string;
  FechaNacimiento?: string;
  Sexo?: 'Hombre' | 'Mujer';
  FechaCreacion?: string;
  NumeroTelefonico?: number;
  Direccion?: any;
  Peso?: number;
  Altura?: number;
  Edad?: number;
  ActividadFisica?: string;
}

export type RawPatient = {
  ID_Paciente?: string;
  Nombre?: string;
}

export type ApointmentData = {
  Id_patient?: string;
  date?: string;
  hour?: string;
}

export interface Alimento {
  id: string;
  "Grupo de alimentos": string;
  ALIMENTO: string;
  // Puede ser string ("1/2") o número (17), dependiendo del parseo
  "Cantidad sugerida": string | number;
  Unidad: string;
  // Propiedades Nutricionales (pueden ser null si eran "ND")
  "Peso bruto (g)": number | null;
  "Peso neto (g)": number | null;
  "Energía (kcal)": number | null;
  "Proteína (g)": number | null;
  "Lípidos (g)": number | null;
  "Hidratos de carbono (g)": number | null;
  "AG saturados (g)": number | null;
  "AG monoinsaturados (g)": number | null;
  "AG poli insaturados (g)": number | null;
  "Colesterol (mg)": number | null;
  "Azúcar (g)": number | null;
  "Fibra (g)": number | null;
  "Vitamina A (mg RE)": number | null;
  "Acido Ascórbico (mg)": number | null;
  "Ácido Fólico (mg)": number | null;
  "Calcio (mg)": number | null;
  "Hierro (mg)": number | null;
  "Potasio (mg)": number | null;
  "Sodio (mg)": number | null;
  "Fósforo (mg)": number | null;
  "Etanol (g)": number | null;
  "IG": number | null;
  "Carga glicémica": number | null;
}