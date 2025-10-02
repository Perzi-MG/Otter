import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { ColorKeys, AppColors as colors } from '../constants/Colors';

export const MenuIcon = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="menu" size={28} color={colors[color]} {...props} />
);
export const SearchIcon = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="search" size={28} color={colors[color]} {...props} />
);

export const MinusIcon = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="minus-circle" size={28} color={colors[color]} {...props} />
);

export const PlusIcon = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="plus-circle" size={28} color={colors[color]} {...props} />
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

export const Mail = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="mail" size={28} color={colors[color]} {...props} />
);
export const Lock = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <Feather name="lock" size={28} color={colors[color]} {...props} />
);
export const Google = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <AntDesign name="google" size={24} color={colors[color]} {...props} />
);
export const Apple = ({ props, color }: { props?: any, color: ColorKeys }) => (
    <AntDesign name="apple" size={24} color={colors[color]} {...props} />
);