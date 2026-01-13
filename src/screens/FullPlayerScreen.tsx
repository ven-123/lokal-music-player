import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Pressable,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { usePlayerStore } from '../store/playerStore';

const FullPlayerScreen = () => {
    const {
        currentSong,
        isPlaying,
        play,
        pause,
        next,
        previous,
        closeFullPlayer,
        positionMillis,
        durationMillis,
        seekTo,
    } = usePlayerStore();

    if (!currentSong) return null;

    const cover =
        currentSong.image?.[2]?.url ||
        currentSong.image?.[2]?.link ||
        currentSong.image?.[1]?.url ||
        currentSong.image?.[1]?.link ||
        currentSong.image?.[0]?.url ||
        currentSong.image?.[0]?.link;

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const progressPercent =
        durationMillis > 0
            ? (positionMillis / durationMillis) * 100
            : 0;

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={closeFullPlayer}
                    style={styles.close}
                >
                    <Ionicons
                        name="chevron-down"
                        size={28}
                        color="#fff"
                    />
                </TouchableOpacity>

                <Image source={{ uri: cover }} style={styles.art} />

                <Text style={styles.title} numberOfLines={1}>
                    {currentSong.name}
                </Text>
                <Text style={styles.artist} numberOfLines={1}>
                    {currentSong.primaryArtists}
                </Text>

                <View style={styles.progressContainer}>
                    <Pressable
                        style={styles.progressBar}
                        onPress={e => {
                            const tapX =
                                e.nativeEvent.locationX;
                            const barWidth = 300;
                            const seek =
                                (tapX / barWidth) *
                                durationMillis;
                            seekTo(seek);
                        }}
                    >
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width: `${progressPercent}%`,
                                },
                            ]}
                        />
                    </Pressable>

                    <View style={styles.timeRow}>
                        <Text style={styles.timeText}>
                            {formatTime(positionMillis)}
                        </Text>
                        <Text style={styles.timeText}>
                            {formatTime(durationMillis)}
                        </Text>
                    </View>
                </View>

                <View style={styles.controls}>
                    <TouchableOpacity onPress={previous}>
                        <Ionicons
                            name="play-skip-back"
                            size={32}
                            color="#fff"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.play}
                        onPress={isPlaying ? pause : play}
                    >
                        <Ionicons
                            name={isPlaying ? 'pause' : 'play'}
                            size={36}
                            color="#000"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={next}>
                        <Ionicons
                            name="play-skip-forward"
                            size={32}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000',
    },

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 12,
    },

    close: {
        alignSelf: 'flex-start',
        padding: 16,
    },

    art: {
        width: 300,
        height: 300,
        borderRadius: 12,
        marginBottom: 24,
    },

    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        paddingHorizontal: 16,
    },

    artist: {
        color: '#aaa',
        fontSize: 14,
        marginTop: 6,
        marginBottom: 24,
    },

    progressContainer: {
        width: 300,
        marginBottom: 36,
    },

    progressBar: {
        height: 4,
        backgroundColor: '#444',
        borderRadius: 2,
    },

    progressFill: {
        height: 4,
        backgroundColor: '#1DB954',
        borderRadius: 2,
    },

    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },

    timeText: {
        color: '#aaa',
        fontSize: 12,
    },

    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    play: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: '#1DB954',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 28,
    },
});

export default FullPlayerScreen;
