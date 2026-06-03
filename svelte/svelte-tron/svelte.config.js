import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess for more information about preprocessors
  preprocess: vitePreprocess(),
  // Allow AppKit's custom elements (e.g. <appkit-button />) without warnings
  compilerOptions: {
    customElement: false
  }
}
