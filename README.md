# BromiumJS Website - Bachelor Thesis Project

## Overview

This is the BromiumJS implementation of a website built for a bachelor thesis comparing web development across different frameworks.

## Important Notes

- **Goal**: Use the simplest builder/tooling possible to create a clean, minimal website
- **Purpose**: Bachelor thesis comparing website development with different frameworks
- **Approach**: Prioritize simplicity and clarity over complex features - this is for academic comparison

## Tech Stack

- **Framework**: BromiumJS (custom reactive framework)
- **Routing**: BromiumJS Router (file-based routing)
- **Build Tool**: Vite
- **Formatting**: Prettier
- **IDE**: WebStorm

## Project Structure

```
src/
├── api/         # API calls (OpenWeather)
├── components/  # Reusable components
├── constants/   # Constants and config
├── helpers/     # Utility functions
├── pages/       # Page components (file-based routing)
├── store/       # State management
├── styles/      # Global CSS styles
├── App.tsx      # Root component
└── main.tsx     # Entry point
```

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run format` - Format code with Prettier

## Development Guidelines

1. Keep it simple - avoid unnecessary complexity
2. Use standard BromiumJS patterns
3. Minimal dependencies
4. Clean, readable code for thesis evaluation
