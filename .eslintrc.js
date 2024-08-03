const { resolve } = require("node:path");

const { JAVASCRIPT_FILES } = require("@vercel/style-guide/eslint/constants");

const project = resolve(__dirname, "tsconfig.json");

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "plugin:@tanstack/eslint-plugin-query/recommended",
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/next"),
    require.resolve("@vercel/style-guide/eslint/node"),
  ],
  parserOptions: {
    project,
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/require-default-props": 0,
    "react/no-array-index-key": 0,
    "react/jsx-props-no-spreading": 0,
    "no-underscore-dangle": 0,
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-confusing-void-expression": [
      "error",
      { ignoreArrowShorthand: true },
    ],
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowAny: false,
        allowBoolean: false,
        allowNullish: false,
        allowNumber: true,
        allowRegExp: false,
        allowNever: false,
      },
    ],
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: "last",
        reservedFirst: true,
      },
    ],
    // sort import statements
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc" },
      },
    ],
    // sort named imports within an import statement
    "sort-imports": ["warn", { ignoreDeclarationSort: true }],
    "react/no-unstable-nested-components": 0,
  },
  overrides: [
    {
      files: JAVASCRIPT_FILES,
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
    },
    // Varies file convention from libraries, e.g. Next.js App Router and Prettier
    // Must use default export
    {
      files: [
        "next.config.mjs",
        "prettier.config.mjs",
        "unlighthouse.config.ts",
        "tailwind.config.ts",
        "app/**/page.tsx",
        "app/**/layout.tsx",
        "app/**/not-found.tsx",
        "app/**/*error.tsx",
        "app/apple-icon.tsx",
        "app/**/opengraph-image.tsx",
        "app/sitemap.ts",
        "app/robots.ts",
      ],
      rules: {
        "import/no-default-export": "off",
        "import/prefer-default-export": ["error", { target: "any" }],
      },
    },
    // module declarations
    {
      files: ["**/*.d.ts"],
      rules: { "import/no-default-export": "off" },
    },
  ],
  ignorePatterns: ["/src/components/ui/*.tsx"],
};
