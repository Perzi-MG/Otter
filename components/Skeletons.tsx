import ContentLoader, { Rect } from "react-content-loader/native";

export const PatientsLoader = () =>
    <ContentLoader viewBox="0 0 245 400" width={330} height={600} speed={1}>
        <Rect x="0" y="0" rx="6" ry="8" width="245" height="35" />
        <Rect x="0" y="50" rx="6" ry="8" width="245" height="35" />
        <Rect x="0" y="100" rx="6" ry="8" width="245" height="35" />
        <Rect x="0" y="150" rx="6" ry="8" width="245" height="35" />
    </ContentLoader>

export const PatientDataLoader = () =>
    <ContentLoader viewBox="0 0 245 400" width={330} height={600} speed={1} style={{position: "absolute"}}>
        <Rect x="0" y="30" rx="10" ry="15" width="120" height="35" />
        <Rect x="130" y="30" rx="10" ry="15" width="120" height="35" />
        <Rect x="0" y="100" rx="10" ry="15" width="120" height="35" />
        <Rect x="130" y="100" rx="10" ry="15" width="120" height="35" />
        <Rect x="0" y="170" rx="10" ry="15" width="245" height="35" />
    </ContentLoader>