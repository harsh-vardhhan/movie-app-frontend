# Movie App Frontend

A premium React application to browse movies, actors, and directors. Built with **Vite**, **Bun**, **Ant Design**, and **TypeScript**.

## Backend Repository
[https://github.com/harsh-vardhhan/movie-app-backend](https://github.com/harsh-vardhhan/movie-app-backend)

## Features
- **Browse Movies**: Filter by genre, search by title.
- **Detailed Views**: Deep dive into movies, actors, and directors.
- **Dark Mode**: Premium "slick" UI with glassmorphism and native dark theme.
- **Responsive**: Fully adaptive layout for all devices.

## Running Locally

### Option 1: Without Docker (Recommended for Dev)
Requirement: [Bun](https://bun.sh/) installed.

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```
The app will be available at `http://localhost:5173`.

### Option 2: With Docker
Requirement: [Docker](https://www.docker.com/) installed.

```bash
# Build and start container
docker-compose up --build
```
The app will be available at `http://localhost:5173`.

