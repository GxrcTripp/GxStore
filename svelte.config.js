import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Preprocesadores (como TypeScript o Tailwind)
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto solo funciona en entornos soportados.
		// Si vas a buildear para Node, cambiar a adapter-node más adelante.
		adapter: adapter()
	}
};

export default config;