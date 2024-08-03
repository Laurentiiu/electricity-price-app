import vercelPrettierOptions from '@vercel/style-guide/prettier';

/** @type {{endOfLine: string, plugins: [string], singleQuote: boolean, printWidth: number, useTabs: boolean, tabWidth: number}} */
const config = {
  ...vercelPrettierOptions,
  plugins: [...vercelPrettierOptions.plugins, 'prettier-plugin-tailwindcss'],
};

export default config;
