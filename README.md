# FanPulse BI

FanPulse BI is a deployment-ready sports business intelligence dashboard for forecasting attendance, ticket revenue, merchandise demand, fan engagement, and sponsorship ROI.

It is designed as a portfolio project for sports business analyst, business analyst, strategy, operations, or front-office analytics roles.

## Features

- Attendance forecasting for upcoming home games
- Ticket revenue projections
- Merchandise demand forecasting
- Fan engagement trend analytics
- Sponsorship ROI estimates
- Scenario simulator for pricing, promotions, playoff push, and star-player injury
- Dynamic pricing recommendation engine
- Responsive executive dashboard UI

## Tech Stack

- React
- Vite
- Recharts
- Framer Motion
- Lucide React
- Docker
- Vercel-ready config

## Run Locally

```bash
npm install
npm run dev
```

Then open the local URL shown in your terminal.

## Build for Production

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repo into Vercel.
3. Use the default Vite settings.
4. Deploy.

The included `vercel.json` is already configured for Vite deployment.

## Deploy with Docker

```bash
docker build -t fanpulse-bi .
docker run -p 8080:80 fanpulse-bi
```

Then open:

```bash
http://localhost:8080
```
