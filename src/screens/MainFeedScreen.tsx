import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Cloud, Coffee, Info, Landmark, Map, MapPin, Star, Utensils } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../lib/appStyles';
import { fetchPlaceByName, getPublicUrl } from '../lib/database';
import { Place } from '../types';

const { width, height } = Dimensions.get('window');

const categories = [
    { id: 'tourist', title: 'ท่องเที่ยว', icon: Map, color: '#1B4332' },
    { id: 'restaurant', title: 'ร้านอาหาร', icon: Utensils, color: '#2D6A4F' },
    { id: 'cafe', title: 'คาเฟ่', icon: Coffee, color: '#40916C' },
    { id: 'temple', title: 'วัด/ประวัติศาสตร์', icon: Landmark, color: '#527169' },
    { id: 'festival', title: 'ประเพณี', icon: Calendar, color: '#D4AF37' },
];

const MainFeedScreen = () => {
    const navigation = useNavigation<any>();
    const [worldHeritage, setWorldHeritage] = React.useState<Place | null>(null);

    React.useEffect(() => {
        const loadWorldHeritage = async () => {
            const data = await fetchPlaceByName('อุทยานประวัติศาสตร์ศรีเทพ');
            if (data) {
                setWorldHeritage(data);
            }
        };
        loadWorldHeritage();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {/* Immersive Hero Section */}
                <ImageBackground
                    source={{ uri: getPublicUrl('images/hero_phetchabun.jpg') }}
                    style={styles.hero}
                >
                    <LinearGradient
                        colors={['rgba(27, 67, 50, 0.1)', 'rgba(253, 252, 246, 1)']}
                        style={styles.heroGradient}
                    >
                        <View style={styles.heroContent}>
                            <View style={styles.logoBadge}>
                                <Image
                                    source={{ uri: getPublicUrl('images/Seal_Phetchabun.png') }}
                                    style={styles.logoImage}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.welcomeText}>WELCOME TO</Text>
                            <Text style={styles.provinceTitle}>เพชรบูรณ์</Text>
                            <Text style={styles.provinceEng}>THE GREEN HEART OF THAILAND</Text>

                            <View style={styles.locationTag}>
                                <MapPin size={14} color={theme.colors.secondary} />
                                <Text style={styles.locationText}>Lower Northern, Thailand</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>

                {/* Content Area */}
                <View style={styles.content}>

                    {/* Province Slogan Section */}
                    <View style={styles.sloganCard}>
                        <LinearGradient
                            colors={['#fff', '#F7F2E9']}
                            style={styles.sloganGradient}
                        >
                            <Text style={styles.sloganLabel}>คำขวัญประจำจังหวัด</Text>
                            <Text style={styles.sloganText}>
                                “มะขามหวาน อุทยานน้ำหนาว เขาค้อทะเลภูเขา ผาแดงถ้ำใหญ่ ไหล่เขาพ่อขุนผาเมือง”
                            </Text>
                        </LinearGradient>
                    </View>

                    {/* Horizontal Category Selector */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>สำรวจตามหมวดหมู่</Text>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryScroll}
                    >
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                style={styles.categoryCard}
                                onPress={() => navigation.navigate(cat.id.charAt(0).toUpperCase() + cat.id.slice(1))}
                            >
                                <View style={[styles.categoryIcon, { backgroundColor: cat.color + '10' }]}>
                                    <cat.icon size={24} color={cat.color} />
                                </View>
                                <Text style={styles.categoryText}>{cat.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>ข้อมูลเบื้องต้น</Text>
                    </View>

                    <View style={styles.bentoGrid}>
                        {/* Main Large Card */}
                        <TouchableOpacity
                            style={styles.bentoLarge}
                            onPress={() => worldHeritage && navigation.navigate('PlaceInfo', { place: worldHeritage })}
                        >
                            <ImageBackground
                                source={{ uri: worldHeritage ? getPublicUrl(worldHeritage.image_path) : getPublicUrl('images/sithep.jpg') }}
                                style={styles.bentoContentLarge}
                            >
                                <LinearGradient
                                    colors={['rgba(27, 67, 50, 0.4)', 'rgba(27, 67, 50, 0.8)']}
                                    style={StyleSheet.absoluteFill}
                                />
                                <View style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}>
                                    <Star size={32} color="#D4AF37" />
                                    <View>
                                        <Text style={styles.bentoTitleLarge}>มรดกโลก</Text>
                                        <Text style={styles.bentoDescLarge}>{worldHeritage?.description || 'อุทยานประวัติศาสตร์ศรีเทพ เมืองโบราณอายุกว่าพันปี'}</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>

                        {/* Two Small Cards */}
                        <View style={styles.bentoColumn}>
                            <View style={[styles.bentoSmall, { backgroundColor: '#F7F2E9' }]}>
                                <Cloud size={24} color="#40916C" />
                                <Text style={styles.bentoValueSmall}>22°C</Text>
                                <Text style={styles.bentoLabelSmall}>อากาศเย็นสบาย</Text>
                            </View>
                            <View style={[styles.bentoSmall, { backgroundColor: '#fff', borderWidth: 1, borderColor: 'rgba(27, 67, 50, 0.05)' }]}>
                                <Info size={24} color="#1B4332" />
                                <Text style={styles.bentoValueSmall}>11 อำเภอ</Text>
                                <Text style={styles.bentoLabelSmall}>การปกครอง</Text>
                            </View>
                        </View>
                    </View>

                    {/* Travel Stories / Detail Sections */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>เรื่องราวของเมือง</Text>
                        <View style={styles.activeIndicator} />
                    </View>

                    <DetailSection
                        title="ภูมิประเทศที่หลากหลาย"
                        content="เป็นที่ราบลุ่มแบบท้องกระทะ ประกอบด้วยเนินเขา ป่าไม้ และน้ำตก มีเทือกเขาเพชรบูรณ์ตั้งขนาบทั้งสองข้าง"
                    />
                    <DetailSection
                        title="สวิตเซอร์แลนด์เมืองไทย"
                        content="เขาค้อและภูทับเบิก แหล่งท่องเที่ยวท้าลมหนาวที่ได้รับฉายาว่า 'สวิตเซอร์แลนด์เมืองไทย'"
                    />
                    <DetailSection
                        title="มะขามหวานคู่เมือง"
                        content="มะขามหวานพันธุ์ดีที่เป็นเอกลักษณ์ของจังหวัด และเป็นสินค้าส่งออกที่สำคัญของชาวเพชรบูรณ์"
                    />
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>
        </View>
    );
};

const DetailSection = ({ title, content }: { title: string; content: string }) => (
    <View style={styles.detailBox}>
        <View style={styles.detailDot} />
        <View style={styles.detailContent}>
            <Text style={styles.detailTitle}>{title}</Text>
            <Text style={styles.detailSub}>{content}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    hero: {
        width: width,
        height: height * 0.52,
    },
    heroGradient: {
        flex: 1,
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: 40,
        justifyContent: 'flex-end',
    },
    logoBadge: {
        backgroundColor: '#fff',
        width: 60,
        height: 60,
        borderRadius: 18,
        padding: 10,
        marginBottom: 16,
        elevation: 10,
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.15,
        shadowRadius: 15,
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    heroContent: {
        gap: 2,
    },
    welcomeText: {
        color: theme.colors.secondary,
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 3,
    },
    provinceTitle: {
        color: theme.colors.primary,
        fontSize: 52,
        fontWeight: '900',
        lineHeight: 58,
    },
    provinceEng: {
        color: theme.colors.subtext,
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 2,
        marginBottom: 10,
    },
    locationTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(27, 67, 50, 0.05)',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
        borderWidth: 1,
        borderColor: 'rgba(27, 67, 50, 0.1)',
    },
    locationText: {
        color: theme.colors.primary,
        fontSize: 13,
        fontWeight: '600',
    },
    content: {
        paddingHorizontal: theme.spacing.lg,
        marginTop: -10,
    },
    sloganCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 20,
        elevation: 5,
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.1,
        shadowRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(27, 67, 50, 0.05)',
    },
    sloganGradient: {
        padding: 20,
    },
    sloganLabel: {
        color: theme.colors.accent,
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 2,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    sloganText: {
        color: theme.colors.text,
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 28,
        fontStyle: 'italic',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginTop: 24,
    },
    sectionTitle: {
        color: theme.colors.primary,
        fontSize: 20,
        fontWeight: '900',
    },
    categoryScroll: {
        paddingRight: 20,
        paddingBottom: 4,
    },
    categoryCard: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 20,
        marginRight: 12,
        alignItems: 'center',
        width: 100,
        elevation: 4,
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(27, 67, 50, 0.03)',
    },
    categoryIcon: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: theme.colors.text,
        textAlign: 'center',
    },
    bentoGrid: {
        flexDirection: 'row',
        gap: 12,
        height: 180,
    },
    bentoLarge: {
        flex: 1.6,
        borderRadius: 24,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.1,
        shadowRadius: 15,
    },
    bentoContentLarge: {
        flex: 1,
        justifyContent: 'space-between',
    },
    bentoTitleLarge: {
        color: '#D4AF37',
        fontSize: 18,
        fontWeight: '900',
        marginBottom: 4,
    },
    bentoDescLarge: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '500',
    },
    bentoColumn: {
        flex: 1,
        gap: 12,
    },
    bentoSmall: {
        flex: 1,
        borderRadius: 22,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        elevation: 3,
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    bentoValueSmall: {
        fontSize: 15,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginTop: 4,
    },
    bentoLabelSmall: {
        fontSize: 10,
        color: theme.colors.subtext,
        fontWeight: '600',
    },
    activeIndicator: {
        height: 3,
        flex: 1,
        backgroundColor: theme.colors.accent,
        marginLeft: 12,
        borderRadius: 2,
        opacity: 0.5,
    },
    detailBox: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 24,
        marginBottom: 12,
        elevation: 3,
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.04,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(27, 67, 50, 0.04)',
    },
    detailDot: {
        width: 4,
        backgroundColor: theme.colors.accent,
        borderRadius: 2,
        marginRight: 12,
    },
    detailContent: {
        flex: 1,
    },
    detailTitle: {
        color: theme.colors.primary,
        fontSize: 17,
        fontWeight: '800',
        marginBottom: 4,
    },
    detailSub: {
        color: theme.colors.subtext,
        fontSize: 14,
        lineHeight: 22,
    }
});

export default MainFeedScreen;
