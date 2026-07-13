// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightTags from 'starlight-tags';

// https://astro.build/config
export default defineConfig({
	site: 'https://jamesalday.com/arkhive',
	base: '/arkhive/',

	integrations: [
		starlight({
			title: 'The Arkhive',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/jamesalday/arkhive' }],
			plugins: [starlightTags({
				onInlineTagsNotFound: 'create',
			})],
			components: {
				PageTitle: './src/components/PageTitleOverride.astro',
			},
			sidebar: [
				{
					label: 'Characters',
					items: [{ autogenerate: { directory: 'character' } }],
				},
				{
					label: 'NPCs',
					items: [{ autogenerate: { directory: 'npc' } }],
				},
				{
					label: 'Sessions',
					items: [{ autogenerate: { directory: 'session' } }],
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
				}
			],
		}),
	],
});
