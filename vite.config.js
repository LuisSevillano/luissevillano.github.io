import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

function stripInvalidRollupOptions() {
	return {
		name: 'strip-invalid-rollup-options',
		configResolved(config) {
			const output = config.build?.rollupOptions?.output;
			const outputs = Array.isArray(output) ? output : output ? [output] : [];

			for (const item of outputs) {
				if ('codeSplitting' in item) {
					delete item.codeSplitting;
				}
			}
		}
	};
}

export default defineConfig({
	plugins: [sveltekit(), stripInvalidRollupOptions()]
});
