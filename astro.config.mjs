import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thesisarcpro.github.io',
  base: '/ThesisArcPro',
  trailingSlash: 'always',
  integrations: [sitemap()],
});