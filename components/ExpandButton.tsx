import { Cancel } from '@/assets/icons';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function ExpandButton(
    { children, icon }:
        {
            children?: React.ReactNode,
            icon?: React.ReactNode,
        }) {
    const INITIAL_HEIGHT = 55
    const INITIAL_WIDTH = 55
    const EXPANDED_WIDTH = 350
    const EXPANDED_HEIGHT = 720
    const animatedHeight = useSharedValue(INITIAL_HEIGHT)
    const animatedWidth = useSharedValue(INITIAL_WIDTH)
    const [isExpanded, setIsExpanded] = useState(false)


    const dropdownAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: animatedHeight.value,
            width: animatedWidth.value
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
            className='flex-col border border-blue rounded-3xl justify-center items-center overflow-hidden w-full bg-black/50'>

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