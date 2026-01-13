import React, { useState } from 'react';
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import { searchSongs } from '../services/saavnApi';
import { usePlayerStore } from '../store/playerStore';

const HomeScreen = () => {
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState<any[]>([]);

    const { setQueue, playSong } = usePlayerStore();

    const onSearch = async () => {
        if (!query.trim()) return;
        const res = await searchSongs(query);
        setSongs(res.data?.results || []);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchRow}>
                <TextInput
                    placeholder="Search songs"
                    placeholderTextColor="#666"
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={onSearch}
                    style={styles.input}
                />

                {query.length > 0 && (
                    <TouchableOpacity onPress={() => setQuery('')}>
                        <Text style={styles.clear}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={songs}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 120 }}
                renderItem={({ item, index }) => {
                    const cover =
                        item.image?.[2]?.url ||
                        item.image?.[2]?.link ||
                        item.image?.[1]?.url ||
                        item.image?.[1]?.link ||
                        item.image?.[0]?.url ||
                        item.image?.[0]?.link;

                    return (
                        <TouchableOpacity
                            style={styles.row}
                            onPress={() => {
                                setQueue(songs);
                                playSong(item, index);
                            }}
                        >
                            <Image
                                source={{ uri: cover }}
                                style={styles.cover}
                            />

                            <View style={styles.textContainer}>
                                <Text
                                    style={styles.title}
                                    numberOfLines={1}
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    style={styles.artist}
                                    numberOfLines={1}
                                >
                                    {item.primaryArtists}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },

    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 12,
    },

    input: {
        flex: 1,
        height: 40,
        color: '#000',
    },

    clear: {
        fontSize: 18,
        color: '#666',
        paddingHorizontal: 6,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },

    cover: {
        width: 50,
        height: 50,
        borderRadius: 6,
        marginRight: 12,
        backgroundColor: '#eee',
    },

    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
    },

    artist: {
        fontSize: 13,
        color: '#555',
        marginTop: 2,
    },
});

export default HomeScreen;
