import type { ColorKeys as AppColorKeys } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AllColorKeys = AppColorKeys;

export type ButtonProps = React.PropsWithChildren<{
    link?: string;
    type?: "back" | "navigate" | "push";
    color?: "blue" | "transparent-blue" | "transparent-white" | "aqua";
    onPress?: () => void;
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
}

export type RawPatient = {
  ID_Paciente?: string;
  Nombre?: string;
}

export interface Antecedente {
  ID_Antecedente: number;
  ID_Paciente: number;
  TipoAntecedente: 'Heredofamiliar' | 'Personal Patológico' | string;
  Subtipo: string;
  Descripcion: string;
}

export interface Consulta {
  ID_Consulta: number;
  ID_Paciente: number;
  FechaConsulta: string;

  // Exploración Física
  PA_Valor?: string;
  PA_Interpretacion?: string;
  FrecuenciaCardiaca?: number;
  FrecuenciaResp?: number;
  SaturacionOxigeno?: number;
  Temperatura?: number;
  AparienciaGeneral?: string;

  // Antropometría
  Peso_kg?: number;
  Talla_m?: number;
  Circ_Cintura_cm?: number;
  Circ_Cadera_cm?: number;
  Pliegue_Tricipital?: number;

  // Cálculos Nutricionales
  GET_Mifflin?: number;
  GET_HarrisBenedict?: number;
  GET_OMS?: number;
  Req_Agua_ml?: number;
  Req_Fibra_g?: number;

  // Cuadro Dietosintético
  Porcentaje_HC?: number;
  Kcal_HC?: number;
  Gramos_HC?: number;
  Porcentaje_Proteina?: number;
  Kcal_Proteina?: number;
  Gramos_Proteina?: number;
  Porcentaje_Lipido?: number;
  Kcal_Lipido?: number;
  Gramos_Lipido?: number;
}

export interface EstudioBioquimico {
  ID_Estudio: number;
  ID_Consulta: number;
  FechaEstudio: string;
  RutaArchivo: string;
  Interpretacion: string;
}