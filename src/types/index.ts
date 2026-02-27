export type CategoryType = 'tourist' | 'restaurant' | 'cafe' | 'temple' | 'festival';

export interface Place {
    id: string;
    category: CategoryType;
    name: string;
    description: string;
    address: string;
    phone?: string | null;
    latitude: number;
    longitude: number;
    image_path: string;
    event_date?: string | null;
}

export type RootStackParamList = {
    MainTabs: undefined;
    Home: undefined;
    Tourist: undefined;
    Restaurant: undefined;
    Cafe: undefined;
    Temple: undefined;
    Festival: undefined;
    PlaceInfo: { place: Place };
};
