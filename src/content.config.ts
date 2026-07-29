import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { starlightTagsExtension } from 'starlight-tags/schema';
import { z } from 'astro/zod';

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

	treasureItems: z.array(
		z.object({
			item: z.string(),
			value: z.number(),
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

const combinedSchema = starlightTagsExtension.merge(sessionFields);

const docs = defineCollection({ 
	loader: docsLoader(), 
	schema: docsSchema({ extend: combinedSchema }) 
});

export type Session = z.infer<typeof sessionFields>;

export const collections = {
	docs: docs,
};
