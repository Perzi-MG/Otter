import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="home/index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="patients">
        <Label>Patients</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      {/* <NativeTabs.Trigger name="firstPage">
        <Label>Home</Label>
        <Icon src={<VectorIcon family={Feather} name="search"/>}/>
      </NativeTabs.Trigger> */}
    </NativeTabs>
  );
}