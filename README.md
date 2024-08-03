# Electricity Price Application

## Overview

This application provides an overview of electricity prices for various regions and detailed price data for selected regions.
It is built using Next.js, TypeScript, TailwindCSS, React Query, and shadcn UI component library.

## Features

- Overview page displaying a list of regions with current electricity prices.
- Search and filter functionality.
- Detail page with tabs showing different types of electricity price data.
- Charts to visualize price data.
- Custom reusable Tabs component.
- Responsive design.
- Error handling and loading states.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Laurentiiu/electricity-price-app.git
   cd electricity-price-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Docker Setup

1. Build the Docker image:

   ```bash
   docker build -t electricity-price-app .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 electricity-price-app
   ```

```bash
npm run test
```
