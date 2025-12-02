import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs backgroundColor={'white'} minimizeBehavior='onScrollDown'>
      <NativeTabs.Trigger name="home">
        <Label>Inicio</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="patients">
        <Label>Pacientes</Label>
        <Icon sf="person.2.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="alimentos">
        <Label>Alimentos</Label>
        <Icon sf="leaf.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Label>Ajustes</Label>
        <Icon sf="gear" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="addPatient" role='search'>
        <Label>Añadir Paciente</Label>
        <Icon sf="person.fill.badge.plus" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}