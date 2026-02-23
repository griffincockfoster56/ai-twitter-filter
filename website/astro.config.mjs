import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ai-twitter-filter.vercel.app',
  integrations: [sitemap()],
  build: {
    assets: '_assets',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
