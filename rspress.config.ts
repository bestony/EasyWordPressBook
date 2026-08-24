import * as path from 'node:path';
import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  lang: 'zh',
  title: '人人都能学会的 WordPress 实战课',
  description: '给普通人的 WordPress 实战课',
  siteOrigin: 'https://www.easywpbook.com',
  multiVersion: {
    default: 'home',
    versions: ['home', 'legacy', 'v2'],
  },
  // Keep mdBook-compatible .html output paths for existing bookmarks and links.
  route: {
    cleanUrls: false,
  },
  search: {
    versioned: true,
  },
  markdown: {
    shiki: {
      // Preserve the legacy fence labels while mapping them to supported grammars.
      langs: ['tsx', 'ts', 'js', 'php', 'javascript', 'html', 'css', 'sql', 'bash'],
      langAlias: {
        Php: 'php',
        'php+HTML': 'php',
        'php+html': 'php',
        'javascript   ': 'javascript',
      },
    },
  },
  themeConfig: {
    editLink: {
      docRepoBaseUrl:
        'https://github.com/bestony/EasyWordPressBook/edit/main/docs',
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/bestony/EasyWordPressBook',
      },
    ],
    footer: {
      message:
        '本作品采用<a href="http://creativecommons.org/licenses/by-nc-nd/4.0/">知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议</a>进行许可。',
    },
  },
});
