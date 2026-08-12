// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightTags from 'starlight-tags';

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import { starlightBasePath } from 'starlight-base-path';

import { sidebar } from './src/sidebar.ts';

// https://astro.build/config
export default defineConfig({
	site: 'https://jamesalday.github.io',
	base: '/arkhive',

	integrations: [
		react(),
		starlight({
			title: 'The Arkhive',
			favicon: '/public/helical.svg',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/jamesalday/arkhive' }],
			plugins: [
				starlightBasePath(),
				starlightTags({
					onInlineTagsNotFound: 'create',
				})
			],
			components: {
				PageTitle: './src/components/PageTitleOverride.astro',
				MarkdownContent: './src/components/MarkdownContentOverride.astro',
			},
			head: [
				{
					tag: 'script',
					attrs: {
						src: "https://www.googletagmanager.com/gtag/js?id=G-B1MY2HGE0P",
						async: true,
					},
				},
				{
					tag: 'script',
					content: `
						window.dataLayer = window.dataLayer || [];
  						function gtag(){dataLayer.push(arguments);}
  						gtag('js', new Date());
  						gtag('config', 'G-B1MY2HGE0P');
					`,
				}
			],
			sidebar,
			customCss: [
				'./src/styles/codex.css'
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
