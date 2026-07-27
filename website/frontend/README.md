# RedVerse Genesis

RedVerse Genesis is a AAA-quality Web3 NFT project built on Polygon.

## Development

1. Run `npm install`
2. Create a `.env` file from `.env.example` and fill in your keys.
3. Run `npm run dev` to start the local development server.

## Production Build

To build the project for production, run:
`npm run build`

## Deployment to Vercel

This project is fully configured for zero-config deployment on Vercel.

1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Open **Environment Variables** in the Vercel Dashboard and add all the variables from your `.env.example`.
5. Click **Deploy**. Vercel will automatically detect Vite and configure the build settings.

*Note: Routing and Security Headers are pre-configured in `vercel.json`.*
