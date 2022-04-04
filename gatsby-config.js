const path = require(`path`);
// adds env variables to node
require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
});

const gatsbyRequiredRules = path.join(
  process.cwd(),
  `node_modules`,
  `gatsby`,
  `dist`,
  `utils`,
  `eslint-rules`
);

module.exports = {
  siteMetadata: {
    title: ``,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    `gatsby-plugin-mdx`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./src/images/`,
      },
      __key: `images`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `./src/pages/`,
      },
      __key: `pages`,
    },
    {
      resolve: `gatsby-plugin-eslint`,
      options: {
        // Gatsby required rules directory
        rulePaths: [gatsbyRequiredRules],
        // Default settings that may be ommitted or customized
        stages: [`develop`],
        extensions: [`js`, `jsx`, `ts`, `tsx`],
        exclude: [`node_modules`, `bower_components`, `.cache`, `public`],
        // Any additional eslint-webpack-plugin options below
        // ...
      },
    },
  ],
};
