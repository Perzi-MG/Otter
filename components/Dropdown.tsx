import { AppColors } from '@/constants/Colors'
import Feather from '@expo/vector-icons/Feather'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import NameButton from './NameButton'


const AnimatedFeather = Animated.createAnimatedComponent(Feather);

export default function Dropdown(
    { data, placeholder, onValueChange, type, minHeight, maxHeight, scrollEnabled }:
        {
            data?: any,
            placeholder?: string,
            onValueChange: (value: string) => void,
            type: 'list' | 'date' | 'time',
            minHeight?: number,
            maxHeight?: number,
            scrollEnabled?: boolean | true
        }) {
    const INITIAL_HEIGHT = minHeight || 55
    const EXPANDED_HEIGHT = maxHeight || 300
    const animatedHeight = useSharedValue(INITIAL_HEIGHT)
    const animatedArrowRotation = useSharedValue(0)
    const [isExpanded, setIsExpanded] = useState(false)
    const [selected, setSelected] = useState(placeholder)
    const [appointmentDate, setAppointmentDate] = useState(new Date());


    const dropdownAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: animatedHeight.value,
        }
    })

    const arrowAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${animatedArrowRotation.value}deg` }
            ],
        };
    });

    const toggleDropdown = () => {
        const newHeight = isExpanded ? INITIAL_HEIGHT : EXPANDED_HEIGHT
        const newArrowRotation = isExpanded ? 0 : 180;
        animatedHeight.value = withSpring(newHeight, {
            damping: 55,
            stiffness: 300,
        })

        animatedArrowRotation.value = withTiming(newArrowRotation, {
            duration: 400,
            easing: Easing.inOut(Easing.sin),
        });

        setIsExpanded(!isExpanded)
    }

    const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
        if (event.type === 'set' && date) {
            setAppointmentDate(date);
            const dateString = date.toISOString();
            onValueChange(dateString);
            setSelected(date.toLocaleDateString());
        }
        if (event.type === 'dismissed') {
            toggleDropdown();
        }
    };
    const handleTimeChange = (event: DateTimePickerEvent, date?: Date) => {
        if (event.type === 'set' && date) {
            setAppointmentDate(date);
            const timeString = date.toISOString();
            onValueChange(timeString);
            setSelected(date.toLocaleTimeString());

        }
        if (event.type === 'dismissed') {
            toggleDropdown();
        }
    };

    return (
        <View className='flex-col gap-1'>
            <Text className='text-brand-black text-md'>{placeholder}</Text>
            <Animated.View
                style={[
                    dropdownAnimatedStyle
                ]}
                className='flex-col border border-blue rounded-3xl justify-start items-start overflow-hidden w-full'>
                <Pressable
                    onPress={toggleDropdown}
                    className='h-16 w-full flex-row items-center justify-between border-b boder-black px-5'>
                    <Text className=''>{selected}</Text>
                    <AnimatedFeather style={arrowAnimatedStyle} name="chevron-down" size={24} color={AppColors.brandBlack} />
                </Pressable>

                {type === 'list' ? (
                    <FlatList
                    scrollEnabled={scrollEnabled}
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({ item }) => <NameButton name={item.label} id={item.value} onPress={() => { setSelected(item.label); toggleDropdown(); onValueChange(item.value) }} />}
                        className='flex flex-col gap-5 w-full' />
                ) : (
                    <RNDateTimePicker
                        themeVariant='light'
                        value={appointmentDate}
                        mode={type}
                        display='spinner'
                        onChange={type === 'date' ? handleDateChange : type === 'time' ? handleTimeChange : handleDateChange} />
                )
                }
            </Animated.View>
        </View>
    )
}