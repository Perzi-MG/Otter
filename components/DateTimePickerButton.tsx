import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

export default function DateTimePickerButton() {
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);

    const onChange = ({ event, selectedDate }: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <View>
            {/* Muestra la fecha seleccionada */}
            <Text style={{ marginBottom: 10 }}>
                Fecha Seleccionada: **{date.toLocaleDateString()}**
            </Text>

            {/* Botón para mostrar el selector de fecha */}
            <Pressable onPress={showDatepicker}>
                <Text>Seleccionar fecha</Text>
            </Pressable>

            {/* Renderizado condicional del selector */}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date} // La fecha actual
                    mode="date" // El modo 'date' (para fecha), 'time' (para hora), 'datetime'
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'} // Estilo de display
                    onChange={onChange} // Función que se llama al seleccionar
                />
            )}
        </View>
    )
}