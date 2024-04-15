// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "asang24 筆記",
  // favicon: "img/coffee.png",
  favicon: "img/github.svg",

  // Set the production url of your site here
  url: "https://asang24-blog.pages.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "asang24", // Usually your GitHub org/user name.
  projectName: "asang24-blog", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      {
        hashed: true,
        language: ["en", "zh"],
      },
    ],
  ],
  plugins: ["docusaurus-plugin-image-zoom"],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/github.svg",
      navbar: {
        title: "asang24",
        // logo: {
        //   alt: "My Site Logo",
        //   src: "img/github.svg",
        // },
        items: [
          {
            type: "docSidebar",
            sidebarId: "intro",
            position: "left",
            label: "Notes",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/asang24",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Notes",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Github",
                href: "https://github.com/asang24",
              },
            ],
          },
          {
            title: "Links",
            items: [
              {
                label: "Lintao | 林饕",
                href: "https://lintao-index.pages.dev/docs/intro",
              },
              {
                label: "WeiYun0912",
                href: "https://wei-docusaurus-vercel.vercel.app/docs/intro",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} asang24 dev, Inc.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["bash", "go", "rust", "json", "yaml", "toml"],
      },
      // By default, only shows h2 and h3 headings
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 6,
      },
      zoom: {
        // selector: ".markdown > img",
        background: {
          light: "rgb(255, 255, 255,0.8)",
          dark: "rgb(50, 50, 50,0.8)",
        },
      },
    }),
};

export default config;
