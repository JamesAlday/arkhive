// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightTags from 'starlight-tags';

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import { starlightBasePath } from 'starlight-base-path';

// https://astro.build/config
export default defineConfig({
	site: 'https://jamesalday.github.io',
	base: '/arkhive',

	integrations: [
		starlight({
			title: 'The Arkhive',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/jamesalday/arkhive' }],
			plugins: [
				starlightBasePath(),
				starlightTags({
					onInlineTagsNotFound: 'create',
				})
			],
			components: {
				PageTitle: './src/components/PageTitleOverride.astro',
			},
			sidebar: [
				{
					label: 'Sessions',
					items: [{ autogenerate: { directory: 'session' } }],
				},
				{
					label: 'Characters',
					items: [{ autogenerate: { directory: 'character' } }],
				},
				{
					label: 'NPCs',
					items: [{ autogenerate: { directory: 'npc' } }],
				},
				{
					label: 'Regions',
					items: [{ autogenerate: { directory: 'region' } }],
				},
				{
					label: 'Locations',
					items: [{ autogenerate: { directory: 'location' } }],
				},
				{
					label: 'Lore',
					items: [{ autogenerate: { directory: 'lore' } }],
				},
				{
					label: 'Groups',
					items: [{ autogenerate: { directory: 'group' } }],
				},
				{
					label: 'Rules',
					items: [{ autogenerate: { directory: 'rule' } }],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				}
			],
		}),
	],

	vite: {
    plugins: [tailwindcss()],
    /** TensorFlow.js pulls many submodules; avoid SSR touching them and help Vite chunk resolution. */
    ssr: {
      external: ["@tensorflow/tfjs", "@tensorflow-models/coco-ssd"],
    },
    optimizeDeps: {
      include: ["@tensorflow/tfjs", "@tensorflow-models/coco-ssd"],
    },
  },
});
