import { useNavigation } from '@react-navigation/native';
import { ArrowRight, MapPin } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../lib/appStyles';
import { fetchByCategory, getPublicUrl } from '../lib/database';
import { CategoryType, Place } from '../types';

interface CategoryScreenProps {
    route: {
        params: {
            category: CategoryType;
            title: string;
        }
    }
}

const ExploreCategoryScreen = ({ route }: CategoryScreenProps) => {
    const { category, title } = route.params;
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation<any>();

    useEffect(() => {
        loadData();
    }, [category]);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await fetchByCategory(category);
            setPlaces(data);
        } catch (err) {
            setError('ไม่สามารถโหลดข้อมูลได้ กะลุนาลองใหม่อีกครั้ง');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={loadData}>
                    <Text style={styles.retryText}>ลองใหม่</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={places}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('PlaceInfo', { place: item })}
                        activeOpacity={0.9}
                    >
                        <Image source={{ uri: getPublicUrl(item.image_path) }} style={styles.image} />
                        <View style={styles.cardBody}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.name}>{item.name}</Text>
                                <ArrowRight size={20} color={theme.colors.primary} />
                            </View>
                            <View style={styles.addressRow}>
                                <MapPin size={16} color={theme.colors.subtext} />
                                <Text style={styles.address} numberOfLines={1}>{item.address}</Text>
                            </View>
                            {item.event_date && (
                                <Text style={styles.date}>ช่วงเวลา: {item.event_date}</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>ไม่พบข้อมูลในหมวดนี้</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
    },
    listContent: {
        padding: theme.spacing.md,
        paddingBottom: 120, // Enough for floating tab bar
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 24,
        marginBottom: theme.spacing.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(27, 67, 50, 0.05)',
        elevation: 4,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: '#F7F2E9',
    },
    cardBody: {
        padding: theme.spacing.md,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        flex: 1,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    address: {
        fontSize: 14,
        color: theme.colors.subtext,
        marginLeft: 4,
        flex: 1,
    },
    date: {
        fontSize: 14,
        color: theme.colors.secondary,
        fontWeight: '700',
        marginTop: 10,
    },
    errorText: {
        fontSize: 16,
        color: theme.colors.subtext,
        marginBottom: theme.spacing.md,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: theme.borderRadius.sm,
    },
    retryText: {
        color: theme.colors.white,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 16,
        color: theme.colors.subtext,
    }
});

export default ExploreCategoryScreen;
