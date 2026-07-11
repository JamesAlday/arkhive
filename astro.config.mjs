// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'The Arkhive',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/jamesalday/arkhive' }],
			sidebar: [
				// {
				// 	label: 'Guides',
				// 	items: [
				// 		// Each item here is one entry in the navigation menu.
				// 		{ label: 'Example Guide', slug: 'guides/example' },
				// 	],
				// },
				{
					label: 'Regions',
					items: [{ autogenerate: { directory: 'region' } }],
				},
				{
					label: 'Lore',
					items: [{ autogenerate: { directory: 'lore' } }],
				},
				{
					label: 'Group',
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
