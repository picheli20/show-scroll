# ShowScroll

A modern TV show discovery application built with Angular and Ionic, featuring a responsive design and intuitive user interface for browsing and searching TV shows.

## 📱 Features

- **Genre-based Browsing**: Horizontal scrollable lists of TV shows organized by genre (Drama, Comedy, Sports, etc.)
- **Popular Shows Dashboard**: Featured section highlighting top-rated shows
- **Show Details**: Comprehensive information page for each TV show
- **Search Functionality**: Quick search with keyboard shortcuts (Cmd/Ctrl + K)
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Share Functionality**: Share shows via native share API or Capacitor Share
- **Cross-platform**: Runs on web, iOS, and Android

## 🏗️ Architecture

### Technology Stack

- **Framework**: Angular 20
- **UI Library**: Ionic 8
- **State Management**: NgRx (Store, Effects, Selectors)
- **Testing**: Jest with jest-preset-angular
- **Mobile**: Capacitor 7

### Project Structure

```
src/app/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # Business logic services
│   ├── http/          # API services
├── store/             # NgRx state management
│   ├── actions/       # Action definitions
│   ├── effects/       # Side effects handlers
│   ├── reducers/      # State reducers
│   ├── selectors/     # Memoized selectors
│   └── interfaces/    # State type definitions
├── enums/             # Enumerations
└── interfaces/        # Type definitions
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v22.12.0 (recommended)
- **npm**: v10.9.0 (recommended)

> **Note**: The project has been tested with Node.js v22.12.0 and npm v10.9.0. Other versions may work but are not guaranteed.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/picheli20/show-scroll
cd show-scroll
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

#### Web Development Server
```bash
npm run serve
```
Navigate to `http://localhost:8100/`. The app will automatically reload if you change any source files.

#### iOS (requires macOS and Xcode)
```bash
# Run on iOS simulator with live reload
npm run serve:ios

# Open in Xcode
npm run open:ios
```

#### Android (requires Android Studio)
```bash
# Run on Android emulator with live reload
npm run serve:android

# Open in Android Studio
npm run open:android
```

### Building for Production

#### Web
```bash
npm run build
```
Build artifacts will be stored in the `www/` directory.

#### iOS
```bash
npm run build:ios
```

#### Android
```bash
npm run build:android
```

## 🧪 Testing

### Run Unit Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

## 📝 Code Linting

```bash
npm run lint
```

## 🌐 API

The application uses the [TVMaze API](https://www.tvmaze.com/api) for TV show data:
- **Base URL**: `https://api.tvmaze.com`
- **Endpoints Used**:
  - `GET /shows` - Fetch all shows
  - `GET /shows/:id` - Fetch show details
  - `GET /search/shows?q=:query` - Search shows

## 🔑 Environment Variables

Environment configurations are located in `src/environments/`:
- `environment.ts` - Development environment
- `environment.prod.ts` - Production environment
- `environment.app.ts` - Mobile app environment

Key configurations:
- `apiUrl`: TVMaze API base URL
- `appUrl`: Application URL for sharing
- `production`: Production flag

## 📦 Key Dependencies

### Production
- `@angular/core`: ^20.0.0
- `@ionic/angular`: ^8.0.0
- `@ngrx/store`: ^20.1.0
- `@ngrx/effects`: ^20.1.0
- `@capacitor/core`: 7.4.4

### Development
- `jest`: ^30.2.0
- `jest-preset-angular`: ^15.0.3
- `@angular/cli`: ^20.0.0
- `typescript`: ~5.9.0
