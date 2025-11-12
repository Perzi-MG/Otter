import { Cancel } from '@/assets/icons';
import React, { useState } from 'react';
import { Dimensions, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const EXPANDED_WIDTH = SCREEN_WIDTH * 0.9;
const EXPANDED_HEIGHT = SCREEN_HEIGHT * 0.85;

export default function ExpandButton(
    { children, icon }:
        {
            children?: React.ReactNode,
            icon?: React.ReactNode,
        }) {
    const INITIAL_HEIGHT = 55
    const INITIAL_WIDTH = 55
    const animatedHeight = useSharedValue(INITIAL_HEIGHT)
    const animatedWidth = useSharedValue(INITIAL_WIDTH)
    const [isExpanded, setIsExpanded] = useState(false)


    const dropdownAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: animatedHeight.value,
            width: animatedWidth.value,
            boxShadow: '0 7px 10px rgba(0, 0, 0, 0.1)'
        }
    })

    const toggleDropdown = () => {
        const newHeight = isExpanded ? INITIAL_HEIGHT : EXPANDED_HEIGHT
        animatedHeight.value = withSpring(newHeight, {
            damping: 55,
            stiffness: 300,
        })
        const newWidth = isExpanded ? INITIAL_WIDTH : EXPANDED_WIDTH
        animatedWidth.value = withSpring(newWidth, {
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
            className='flex-col rounded-3xl justify-center items-center overflow-hidden w-full'>

            {isExpanded === true ? (
                <Pressable className='w-16 h-16 absolute z-10 flex justify-center items-center left-1 top-10' onPress={toggleDropdown}>
                    <Cancel color='brandBlack' />
                </Pressable>
            ) : (
                <Pressable className='bg-white w-24 h-24 absolute z-10 flex justify-center items-center' onPress={toggleDropdown}>
                    {icon}
                </Pressable>
            )}
            {children}
        </Animated.View>
    )
}