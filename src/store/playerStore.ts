import { create } from 'zustand';
import { Audio } from 'expo-av';

Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    playsInSilentModeIOS: true,
});

let sound: Audio.Sound | null = null;

interface PlayerState {
    currentSong: any;
    isPlaying: boolean;
    queue: any[];
    currentIndex: number;

    positionMillis: number;
    durationMillis: number;

    isFullPlayerOpen: boolean;
    openFullPlayer: () => void;
    closeFullPlayer: () => void;

    setQueue: (songs: any[]) => void;
    playSong: (song: any, index: number) => Promise<void>;
    play: () => Promise<void>;
    pause: () => Promise<void>;
    next: () => Promise<void>;
    previous: () => Promise<void>;
    seekTo: (millis: number) => Promise<void>;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    positionMillis: 0,
    durationMillis: 1,

    isFullPlayerOpen: false,
    openFullPlayer: () => set({ isFullPlayerOpen: true }),
    closeFullPlayer: () => set({ isFullPlayerOpen: false }),

    setQueue: songs =>
        set({ queue: songs, currentIndex: -1, currentSong: null }),

    playSong: async (song, index) => {
        set({
            currentSong: song,
            currentIndex: index,
            isPlaying: true,
            positionMillis: 0,
            durationMillis: 1,
        });

        if (sound) {
            await sound.unloadAsync();
            sound = null;
        }

        const audioUrl =
            song.downloadUrl?.find((d: any) => d.url)?.url ||
            song.downloadUrl?.find((d: any) => d.link)?.link;

        if (!audioUrl) return;

        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: audioUrl },
            { shouldPlay: true }
        );

        newSound.setOnPlaybackStatusUpdate((status: any) => {
            if (!status.isLoaded) return;

            set({
                positionMillis: status.positionMillis ?? 0,
                durationMillis: status.durationMillis ?? 1,
                isPlaying: status.isPlaying,
            });
        });

        sound = newSound;
    },

    play: async () => {
        set({ isPlaying: true });
        if (sound) await sound.playAsync();
    },

    pause: async () => {
        set({ isPlaying: false });
        if (sound) await sound.pauseAsync();
    },

    seekTo: async millis => {
        if (sound) await sound.setPositionAsync(millis);
    },

    next: async () => {
        const { queue, currentIndex, playSong } = get();
        if (currentIndex + 1 < queue.length) {
            await playSong(queue[currentIndex + 1], currentIndex + 1);
        }
    },

    previous: async () => {
        const { queue, currentIndex, playSong } = get();
        if (currentIndex - 1 >= 0) {
            await playSong(queue[currentIndex - 1], currentIndex -1);
        }
    },
}));
