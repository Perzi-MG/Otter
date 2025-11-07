import { useAuth } from '@/context/AuthContext'
import usePatientList from '@/hooks/get'
import { useState } from 'react'
import { FlatList, Pressable, Text } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import PatientButton from './PatientButton'

const INITIAL_HEIGHT = 50 // Height of the dropdown button
const EXPANDED_HEIGHT = 200 // Max height when expanded (adjust as needed)
const ANIMATION_DURATION = 300

export default function Dropdown() {
    const { user, db } = useAuth()
    const { patients } = usePatientList(user, db)
    const animatedHeight = useSharedValue(INITIAL_HEIGHT)
    const [isExpanded, setIsExpanded] = useState(false)

    const dropdownAnimatedStyle = useAnimatedStyle(() => {
        return {
            
            transitionProperty: 'height',
            height: animatedHeight.value,
        }
    })

    const toggleDropdown = () => {
        const newHeight = isExpanded ? INITIAL_HEIGHT : EXPANDED_HEIGHT
        animatedHeight.value = withSpring(newHeight, {
            damping: 55,
            stiffness: 300,
        })

        setIsExpanded(!isExpanded)
    }
    return (
        <Animated.View
            style={[
                dropdownAnimatedStyle
            ]}
            className='flex-col border border-black rounded-3xl justify-center items-center overflow-hidden'>
            <Pressable
                onPress={toggleDropdown}
                className='h-14 w-full flex items-center justify-center bg-slate-500'>
                <Text>Dropdown</Text>
            </Pressable>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={patients}
                renderItem={({ item }) => <PatientButton name={item.label} description={item.label} id={item.value} />}
                className='flex flex-col gap-5 w-full' />
        </Animated.View>
    )
}