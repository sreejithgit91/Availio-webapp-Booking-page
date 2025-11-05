# Availio Booking Page

A modern booking application built with React, TypeScript, and Vite.

## Project Structure

- `booking-app/` - Main application directory
  - `src/` - React source code
  - `dist/` - Build output (generated)
  - `package.json` - Dependencies and scripts

## Local Development

```bash
cd booking-app
npm install
npm run dev
```

## Building for Production

```bash
cd booking-app
npm run build
```

The build output will be in `booking-app/dist/`

## Vercel Deployment

This project is configured for Vercel deployment. The `vercel.json` file in the root directory configures Vercel to:
- Build from the `booking-app` directory
- Serve static files from `booking-app/dist`
- Rewrite all routes to `index.html` for client-side routing

## Features

- Calendar-based booking interface
- Court selection
- Time slot selection
- Participant management
- No calendar booking mode

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- FullCalendar
- Express (for local server)
