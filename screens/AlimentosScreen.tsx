import data from '@/assets/alimentos.json';
import { GradientColors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AlimentosScreen() {
    const [selectedGroup, setSelectedGroup] = useState<string>('Todos')
    const [searchQuery, setSearchQuery] = useState('')
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const groups = useMemo(() => {
        const allGroups = data.map((item) => item['Grupo de alimentos'])
        return ['Todos', ...Array.from(new Set(allGroups))]
    }, [])

    const filteredData = useMemo(() => {
        let result = data;

        if (selectedGroup !== 'Todos') {
            result = result.filter((item) => item['Grupo de alimentos'] === selectedGroup)
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter((item) =>
                item.ALIMENTO.toLowerCase().includes(query) ||
                item['Grupo de alimentos'].toLowerCase().includes(query)
            )
        }

        return result
    }, [selectedGroup, searchQuery])

    return (
        <LinearGradient
            colors={[GradientColors.skyBlue, GradientColors.pureWhite, GradientColors.lightMintGreen]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
                flex: 1,
            }}
        >

            <View style={{
                flex: 1,
                paddingTop: insets.top,
            }}>
                <View style={styles.headerContainer}>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar alimentos..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor="#999"
                        />
                    </View>
                </View>

                <View style={styles.filterContainer}>
                    <ScrollView
                        keyboardDismissMode='on-drag'
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.filterContent}
                    >
                        {groups.map((group) => (
                            <TouchableOpacity
                                key={group}
                                style={[
                                    styles.filterButton,
                                    selectedGroup === group && styles.filterButtonActive,
                                ]}
                                onPress={() => setSelectedGroup(group)}
                            >
                                <Text
                                    style={[
                                        styles.filterText,
                                        selectedGroup === group && styles.filterTextActive,
                                    ]}
                                >
                                    {group}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <FlatList
                    keyboardDismissMode='on-drag'
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable style={styles.itemContainer}
                            onPress={() => router.navigate({ pathname: '/alimentos/[alimentoId]', params: { id: item.id } })}
                        >
                            <Text style={styles.itemTitle}>{item.ALIMENTO}</Text>
                            <Text style={styles.itemSubtitle}>{item['Grupo de alimentos']}</Text>
                        </Pressable>
                    )}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1A1A1A',
        height: '100%',
    },
    filterContainer: {
        paddingBottom: 12,
    },
    filterContent: {
        paddingHorizontal: 16,
        gap: 8,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F0F2F5',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    filterButtonActive: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    filterText: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },
    filterTextActive: {
        color: '#fff',
        fontWeight: '600',
    },
    listContent: {
        padding: 16,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    itemSubtitle: {
        fontSize: 13,
        color: '#888',
    },
})