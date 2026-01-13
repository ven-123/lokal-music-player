import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import MiniPlayer from './src/components/MiniPlayer';
import FullPlayerScreen from './src/screens/FullPlayerScreen';
import { usePlayerStore } from './src/store/playerStore';

export default function App() {
    const isFullPlayerOpen = usePlayerStore(
        s => s.isFullPlayerOpen
    );

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <HomeScreen />
            </SafeAreaView>

            <MiniPlayer />

            {isFullPlayerOpen && <FullPlayerScreen />}
        </View>
    );
}
