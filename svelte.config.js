import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
		}),

		target: '#svelte',

		paths: {
			base: process.env.NODE_ENV === 'production' ? '/resume/' : '/',
			assets: process.env.NODE_ENV === 'production' ? '/resume/' : '/'
		},
	},


	preprocess: [preprocess({})]
};

export default config;
