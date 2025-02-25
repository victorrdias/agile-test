# TV Show Details Application

This is a web application for displaying TV show details, including information about the show, seasons, episodes, and cast.

## Features

- Full screen overlay design
- Show details fetched from API
- Episodes listing with thumbnails and descriptions
- Season navigation
- Cast section with carousel navigation
- Episode selection with details view
- Responsive UI with animations

## Technologies Used

- Next.js 14 (App Router)
- React 18
- TypeScript
- TailwindCSS (CSS Framework)
- React Query (Data Fetching)
- Framer Motion (Animations)
- Axios (HTTP Client)

## Prerequisites

- Node.js 18 or later
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/tv-show-details.git
cd tv-show-details
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

## Running the Application

1. Start the development server:

```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to:

```
http://localhost:3000
```

## Building for Production

1. Create a production build:

```bash
npm run build
# or
yarn build
```

2. Start the production server:

```bash
npm start
# or
yarn start
```

## Project Structure

- `/app` - Main application code
  - `/components` - React components
  - `/hooks` - Custom React hooks for data fetching
  - `/types` - TypeScript type definitions
  - `page.tsx` - Main page component
  - `layout.tsx` - Layout component

## API Endpoints

The application fetches data from the following APIs:

- TV Show Data: `https://agile-releases.s3.us-east-1.amazonaws.com/tests/tv-shows/SHOW123.json`
- Episodes Data: `https://agile-releases.s3.us-east-1.amazonaws.com/tests/episodes/SHOW123.json`

## License

MIT
