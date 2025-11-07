import DropdownComponent from '@/components/Dropdown';
import ScreenLayout from '@/components/ScreenLayout';
import { useAuth } from '@/context/AuthContext';
import usePatientList from '@/hooks/get';
import { useState } from 'react';


export default function SetApointmentScreen() {
  const { user, db } = useAuth()
  const [value, setValue] = useState(null);
  const { patients } = usePatientList(user, db)

  return (
    <ScreenLayout>
        <DropdownComponent
          data={patients}
          placeholder='Seleccione un paciente'
          value={value}
          onChange={(item) => {
            setValue(item)
          }}
        />
    </ScreenLayout>
  )
}