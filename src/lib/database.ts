import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import { CategoryType, Place } from '../types';

// Replace with your Supabase URL and Anon Key
const supabaseUrl = 'https://qjzzlshqjdibaahzykpg.supabase.co';
const supabaseKey = 'sb_publishable_rActUwv8BuqxpQstf8adhA_DNhaNNxw';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchByCategory = async (category: CategoryType): Promise<Place[]> => {
    const { data, error } = await supabase
        .from('places')
        .select('*')
        .eq('category', category);

    if (error) {
        console.error('Error fetching places:', error);
        throw error;
    }

    return data as Place[];
};

export const getPublicUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    // Check if path already includes bucket name (e.g., "images/tourist/...")
    const parts = path.split('/');
    if (parts.length > 1) {
        const bucket = parts[0];
        const rest = parts.slice(1).join('/');
        const { data } = supabase.storage.from(bucket).getPublicUrl(rest);
        return data.publicUrl;
    }

    const { data } = supabase.storage.from('images').getPublicUrl(path);
    return data.publicUrl;
};
export const fetchPlaceByName = async (name: string): Promise<Place | null> => {
    const { data, error } = await supabase
        .from('places')
        .select('*')
        .eq('name', name)
        .single();

    if (error) {
        console.error('Error fetching place by name:', error);
        return null;
    }

    return data as Place;
};
