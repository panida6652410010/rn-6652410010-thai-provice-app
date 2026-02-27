import { Calendar, MapPin, Navigation, Phone } from 'lucide-react-native';
import React from 'react';
import { Image, Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../lib/appStyles';
import { getPublicUrl } from '../lib/database';
import { Place } from '../types';

interface PlaceInfoScreenProps {
    route: {
        params: {
            place: Place;
        }
    }
}

const PlaceInfoScreen = ({ route }: PlaceInfoScreenProps) => {
    const { place } = route.params;

    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
        Linking.openURL(url);
    };

    const makeCall = () => {
        if (place.phone) {
            Linking.openURL(`tel:${place.phone}`);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{ uri: getPublicUrl(place.image_path) }} style={styles.image} />

                <View style={styles.content}>
                    <Text style={styles.name}>{place.name}</Text>

                    <View style={styles.addressContainer}>
                        <MapPin size={18} color={theme.colors.secondary} />
                        <Text style={styles.address}>{place.address}</Text>
                    </View>

                    {place.event_date && (
                        <View style={styles.infoRow}>
                            <Calendar size={18} color={theme.colors.primary} />
                            <Text style={styles.infoText}>จัดช่วง: {place.event_date}</Text>
                        </View>
                    )}

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>รายละเอียด</Text>
                    <Text style={styles.description}>{place.description}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>ตำแหน่งที่ตั้ง</Text>
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: place.latitude,
                                longitude: place.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                        >
                            <Marker
                                coordinate={{ latitude: place.latitude, longitude: place.longitude }}
                                title={place.name}
                            />
                        </MapView>
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity style={[styles.actionButton, styles.navButton]} onPress={openGoogleMaps}>
                            <Navigation size={20} color={theme.colors.white} />
                            <Text style={styles.actionText}>นำทางด้วย Google Maps</Text>
                        </TouchableOpacity>

                        {place.phone && (
                            <TouchableOpacity style={[styles.actionButton, styles.callButton]} onPress={makeCall}>
                                <Phone size={20} color={theme.colors.primary} />
                                <Text style={styles.actionTextCall}>โทรสอบถาม</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={{ height: 120 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    image: {
        width: '100%',
        height: 280,
    },
    content: {
        padding: theme.spacing.lg,
        marginTop: -30,
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        elevation: 10,
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    name: {
        fontSize: 32,
        fontWeight: '900',
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        opacity: 0.8,
    },
    address: {
        fontSize: 15,
        color: theme.colors.subtext,
        marginLeft: 6,
        flex: 1,
        fontWeight: '500',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
        backgroundColor: 'rgba(212, 175, 55, 0.08)',
        padding: 12,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    infoText: {
        fontSize: 15,
        color: theme.colors.accent,
        fontWeight: '700',
        marginLeft: 8,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(27, 67, 50, 0.08)',
        marginVertical: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: theme.colors.primary,
        marginBottom: theme.spacing.sm,
    },
    description: {
        fontSize: 16,
        color: theme.colors.subtext,
        lineHeight: 28,
        fontWeight: '400',
    },
    mapContainer: {
        height: 240,
        borderRadius: 24,
        overflow: 'hidden',
        marginVertical: theme.spacing.lg,
        borderWidth: 1,
        borderColor: 'rgba(27, 67, 50, 0.1)',
        elevation: 5,
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    actions: {
        marginTop: theme.spacing.xl,
        gap: theme.spacing.md,
    },
    actionButton: {
        flexDirection: 'row',
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        elevation: 5,
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    navButton: {
        backgroundColor: theme.colors.primary,
    },
    callButton: {
        backgroundColor: '#fff',
        borderWidth: 1.5,
        borderColor: theme.colors.primary,
    },
    actionText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
    },
    actionTextCall: {
        color: theme.colors.primary,
        fontSize: 18,
        fontWeight: '800',
    },
});

export default PlaceInfoScreen;
