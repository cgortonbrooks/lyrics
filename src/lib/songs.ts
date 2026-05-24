import { getCollection, type CollectionEntry } from 'astro:content';

export type SongEntry = CollectionEntry<'songs'>;

export async function getSongs() {
	const songs = await getCollection('songs');

	return songs.sort((left, right) => {
		const artistCompare = left.data.artist.localeCompare(right.data.artist);
		if (artistCompare !== 0) {
			return artistCompare;
		}

		return left.data.title.localeCompare(right.data.title);
	});
}

export function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function getArtistSlug(song: SongEntry) {
	return slugify(song.data.artist);
}

export function getArtistPath(artist: string) {
	return `/artist/${slugify(artist)}/`;
}

export function getSongPath(song: SongEntry) {
	return `/song/${song.id}/`;
}

export function getPlayPath(song: SongEntry) {
	return `/play/${song.id}/`;
}

export function getSongLines(song: SongEntry) {
	return song.body.replace(/\r\n/g, '\n').split('\n');
}

export function groupSongsByArtist(songs: SongEntry[]) {
	const groups = new Map<string, SongEntry[]>();

	for (const song of songs) {
		const key = song.data.artist;
		const existing = groups.get(key);
		if (existing) {
			existing.push(song);
		} else {
			groups.set(key, [song]);
		}
	}

	return [...groups.entries()].map(([artist, artistSongs]) => ({
		artist,
		slug: slugify(artist),
		songs: artistSongs,
	}));
}