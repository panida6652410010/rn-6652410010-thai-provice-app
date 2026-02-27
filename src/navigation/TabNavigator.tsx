import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Calendar, Coffee, Home, Landmark, Map, Utensils } from 'lucide-react-native';
import React from 'react';
import { theme } from '../lib/appStyles';
import ExploreCategoryScreen from '../screens/ExploreCategoryScreen';
import MainFeedScreen from '../screens/MainFeedScreen';
import PlaceInfoScreen from '../screens/PlaceInfoScreen';
import { RootStackParamList } from '../types';

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const CategoryStack = ({ category, title }: { category: any, title: string }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: theme.colors.primary,
                headerTitleStyle: { fontWeight: 'bold' },
            }}
        >
            <Stack.Screen
                name={category as any}
                component={ExploreCategoryScreen as any}
                initialParams={{ category, title }}
                options={{ title }}
            />
            <Stack.Screen
                name="PlaceInfo"
                component={PlaceInfoScreen}
                options={({ route }: any) => ({ title: route.params.place.name })}
            />
        </Stack.Navigator>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.colors.highlight,
                tabBarInactiveTintColor: theme.colors.subtext,
                headerShown: false,
                tabBarStyle: {
                    height: 75,
                    paddingBottom: 15,
                    paddingTop: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderTopWidth: 0,
                    position: 'absolute',
                    bottom: 20,
                    left: 16,
                    right: 16,
                    borderRadius: 24,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.1,
                    shadowRadius: 15,
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={MainFeedScreen}
                options={{
                    tabBarLabel: 'หน้าแรก',
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Tourist"
                options={{
                    tabBarLabel: 'ท่องเที่ยว',
                    tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
                }}
            >
                {() => <CategoryStack category="tourist" title="สถานที่ท่องเที่ยว" />}
            </Tab.Screen>
            <Tab.Screen
                name="Restaurant"
                options={{
                    tabBarLabel: 'ร้านอาหาร',
                    tabBarIcon: ({ color, size }) => <Utensils color={color} size={size} />,
                }}
            >
                {() => <CategoryStack category="restaurant" title="ร้านอาหารแนะนำ" />}
            </Tab.Screen>
            <Tab.Screen
                name="Cafe"
                options={{
                    tabBarLabel: 'คาเฟ่',
                    tabBarIcon: ({ color, size }) => <Coffee color={color} size={size} />,
                }}
            >
                {() => <CategoryStack category="cafe" title="ร้านกาแฟ/ของหวาน" />}
            </Tab.Screen>
            <Tab.Screen
                name="Temple"
                options={{
                    tabBarLabel: 'วัด',
                    tabBarIcon: ({ color, size }) => <Landmark color={color} size={size} />,
                }}
            >
                {() => <CategoryStack category="temple" title="วัด/ศาสนสถาน" />}
            </Tab.Screen>
            <Tab.Screen
                name="Festival"
                options={{
                    tabBarLabel: 'ประเพณี',
                    tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />,
                }}
            >
                {() => <CategoryStack category="festival" title="งานประเพณี" />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default TabNavigator;
