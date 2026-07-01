import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thesisarcpro.com',
  base: '/',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/admin/') &&
        !page.includes('/dashboard/') &&
        !page.includes('/login/') &&
        !page.includes('/signup/') &&
        !page.includes('/thankyou/')
    }),
  ],
});