import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { usePlayerStore } from '../store/playerStore';

const MiniPlayer = () => {
    const {
        currentSong,
        isPlaying,
        play,
        pause,
        openFullPlayer,
    } = usePlayerStore();

    if (!currentSong) return null;

    const cover =
        currentSong.image?.[2]?.url ||
        currentSong.image?.[2]?.link ||
        currentSong.image?.[1]?.url ||
        currentSong.image?.[1]?.link ||
        currentSong.image?.[0]?.url ||
        currentSong.image?.[0]?.link;

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={openFullPlayer}
            style={styles.wrapper}
        >
            <View style={styles.container}>
               
                <Image source={{ uri: cover }} style={styles.cover} />

                <View style={styles.text}>
                    <Text numberOfLines={1} style={styles.title}>
                        {currentSong.name}
                    </Text>
                    <Text numberOfLines={1} style={styles.artist}>
                        {currentSong.primaryArtists}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={isPlaying ? pause : play}
                    style={styles.playBtn}
                >
                    <Ionicons
                        name={isPlaying ? 'pause' : 'play'}
                        size={20}
                        color="#000"
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 48,
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#121212',
        padding: 12,
        borderRadius: 16,
        elevation: 10,
    },

    cover: {
        width: 44,
        height: 44,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: '#222',
    },

    text: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },

    artist: {
        color: '#aaa',
        fontSize: 12,
        marginTop: 2,
    },

    playBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1DB954',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MiniPlayer;
