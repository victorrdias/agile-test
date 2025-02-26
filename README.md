# TV Show Details Application

This is a modern, responsive web application for displaying comprehensive TV show information, including show details, seasons, episodes, cast information, and more.

## 🌟 Key Features

- **Immersive UI Design**: Full-screen overlay with beautiful transitions and animations
- **Dynamic Content Loading**: Show details and episodes fetched asynchronously from API
- **Episode Management**:
  - Visual episode listing with thumbnails and descriptions
  - Detailed episode view with comprehensive information
  - Skeleton loading states for better user experience
- **Season Navigation**: Intuitive tabs for navigating between different seasons
- **Rich Show Information**:
  - General show information including synopsis and metadata
  - Cast section with interactive carousel navigation
  - Awards and recognition information
- **Interactive Components**:
  - Action buttons for favorite, share, and download
  - Toast notifications for user feedback
  - Tab navigation for organized content display
- **Fully Responsive Design**: Optimized for mobile, tablet, and desktop viewports
- **Performance Optimized**: Efficient data fetching and caching with React Query

## 🛠️ Technology Stack

- **Next.js 15.1.7** with App Router for modern, server-side rendered React applications
- **React 19** featuring the latest React features and optimizations
- **TypeScript** for type safety and improved developer experience
- **TailwindCSS** for utility-first CSS and responsive design
- **React Query** (@tanstack/react-query) for efficient data fetching and caching
- **Framer Motion** for smooth, physics-based animations
- **Axios** for HTTP requests
- **Heroicons** for consistent, high-quality SVG icons
- **CLSX** for conditional class name composition

## 📋 Prerequisites

- Node.js 18 or later
- npm or yarn

## 🚀 Installation

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

## 💻 Running the Application

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

## 🏗️ Building for Production

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

## 📁 Project Structure

- `/app` - Main application code (Next.js App Router)
  - `/components` - Reusable React components
    - `/EpisodeList` - Episode listing and details components
    - `/ShowInfo` - Show information display components
    - `/ui` - Common UI components
  - `/hooks` - Custom React hooks for data management
    - `useShow.ts` - Show data fetching
    - `useEpisodes.ts` - Episodes data fetching
    - `useShowInfo.ts` - Show information management
    - `useEpisodeList.ts` - Episode list management
  - `/lib` - Shared utilities and constants
  - `/types` - TypeScript type definitions
  - `page.tsx` - Main page component
  - `layout.tsx` - Layout component with providers

## 🔍 Implementation Details

- **Custom hooks architecture** for clean separation of data fetching and UI
- **React Query** implementation for efficient server state management
- **Responsive design** implemented with Tailwind CSS utility classes
- **Skeleton loading states** for improved perceived performance
- **Tab-based navigation** for organizing content
- **Animation system** using Framer Motion for smooth transitions

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Mobile devices (portrait and landscape)
- Tablets
- Desktops and large displays

## 📄 License

MIT
