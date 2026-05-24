import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const songs = defineCollection({
	loader: glob({
		pattern: '**/*.md',
		base: './src/content/songs',
	}),
	schema: z.object({
		title: z.string(),
		artist: z.string(),
		capo: z.union([z.number().int().nonnegative(), z.string()]).default('None'),
		chords: z.array(z.string()).default([]),
		notes: z.string().optional(),
		key: z.string().optional(),
		tuning: z.string().default('Standard'),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = {
	songs,
};