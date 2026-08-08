import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://agentstatuscodes.org',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light' }
  }
});
