import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ColorKeys, AppColors as colors } from '../constants/Colors';

export const MenuIcon = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="menu" size={28} color={colors[color]} {...props} />
);
export const SearchIcon = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="search" size={28} color={colors[color]} {...props} />
);
export const CalendarIcon = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <MaterialCommunityIcons name="calendar-plus" size={28} color={colors[color]} {...props} />
);

export const MinusIcon = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="minus-circle" size={28} color={colors[color]} {...props} />
);

export const PlusIcon = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="plus" size={28} color={colors[color]} {...props} />
);

export const CheckIcon = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="check-circle" size={28} color={colors[color]} {...props} />
);

export const User = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="user" size={28} color={colors[color]} {...props} />
);

export const ArrowBack = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="chevron-left" size={28} color={colors[color]} {...props} />
);

export const ArrowNext = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="chevron-right" size={24} color={colors[color]} {...props} />
);
export const ArrowDown = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="chevron-down" size={24} color={colors[color]} {...props} />
);

export const Mail = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="mail" size={28} color={colors[color]} {...props} />
);
export const Users = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="users" size={28} color={colors[color]} {...props} />
);
export const Gear = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="gear" size={28} color={colors[color]} {...props} />
);
export const Lock = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="lock" size={28} color={colors[color]} {...props} />
);
export const Notification = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="bell" size={28} color={colors[color]} {...props} />
);
export const Cancel = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="x" size={28} color={colors[color]} {...props} />
);
export const Google = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <AntDesign name="google" size={24} color={colors[color]} {...props} />
);
export const Apple = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <AntDesign name="apple" size={24} color={colors[color]} {...props} />
);
export const Facebook = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <FontAwesome5 name="facebook" size={24} color={colors[color]} {...props} />
);
export const PersonPlus = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <FontAwesome5 name="user-plus" size={24} color={colors[color]} {...props} />
);
export const Phone = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <FontAwesome name="phone" size={24} color={colors[color]} {...props} />
);
export const Home = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <FontAwesome name="home" size={24} color={colors[color]} {...props} />
);
export const Eye = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="eye" size={24} color={colors[color]} {...props} />
);
export const EyeOff = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="eye-off" size={24} color={colors[color]} {...props} />
);