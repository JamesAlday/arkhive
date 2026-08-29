import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { starlightTagsExtension } from 'starlight-tags/schema';
import { z } from 'astro/zod';

// DMG rarities, plus "Unknown" for items confirmed magic but not yet identified
const itemRarities = z.enum(['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Unknown']);

// Frontmatter schema for session pages
const sessionFields = z.object({
	title: z.string(),
	description: z.string(),
	session: z.number(),
	date: z.coerce.date(),
	tableOfContents: z.boolean().optional(),
	tags: z.array(z.string()),

	xp: z.object({
		total: z.number(),
		each: z.number(),
		players: z.number(),
	}),

	level: z.object({
		start: z.number(),
		end: z.number(),
	}),

	npcs: z.array(
		z.object({
			id: z.string().optional(),
			name: z.string().optional(),
			role: z.string().optional(),
		})
	).default([]),

	treasureItems: z.array(
		z.object({
			item: z.string(),
			value: z.number(),
			rarity: itemRarities.optional(),
		})
	),

	treasureTotal: z.number(),

	encounters: z.array(
		z.object({
			encounter: z.string(),
			cr: z.number().nullable(),
			quantity: z.number(),
			xpEach: z.number().optional(),
			xpTotal: z.number(),
		})
	).default([]),
}).partial();

// Frontmatter schema for NPC pages
const npcFields = z.object({
	title: z.string(),
	aliases: z.array(z.string()),
	species: z.string(),
	gender: z.string(),
	faction: z.string(),
	occupation: z.string(),
	status: z.string(),
}).partial();

const combinedSchema = z.object({
	...starlightTagsExtension.shape,
	...sessionFields.shape,
	...npcFields.shape,
});

const docs = defineCollection({ 
	loader: docsLoader(), 
	schema: docsSchema({extend: combinedSchema}),
});

export type Session = z.infer<typeof sessionFields>;
export type NPC = z.infer<typeof npcFields>;

export const collections = {
	docs: docs,
};
