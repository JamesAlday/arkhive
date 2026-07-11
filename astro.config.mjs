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
