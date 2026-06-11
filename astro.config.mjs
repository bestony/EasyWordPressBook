// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightVersions from 'starlight-versions';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: '人人都能学会的 WordPress 实战课',
      customCss: ['/src/styles/gitbook.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/bestony/EasyWordPressBook' }],
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        {
          label: 'Reference',
          items: [{ autogenerate: { directory: 'reference' } }],
        },
      ],
      plugins: [
        starlightVersions({
          current: { label: '最新版', redirect: 'root' },
          versions: [{ slug: 'legacy', label: 'Legacy', redirect: 'root' }],
        }),
      ],
    }),
  ],
});
