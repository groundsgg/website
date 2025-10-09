# GroundsGG — Placeholder (Cloudflare Workers + Tailwind)

A minimal, dark, geheimnisvoll landing page for GroundsGG. No images. Deploys via Cloudflare Workers.

## Quickstart
```bash
npm i -g wrangler
npm install
npm run dev   # Tailwind watch + Workers dev
npm run build # Build Tailwind CSS
npm run deploy # Deploy to Cloudflare
```

## GitHub Actions Setup

This project includes automated deployment via GitHub Actions. To set it up:

1. **Fork this repository** or push to your own repository
2. **Add secrets to your GitHub repository:**
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID

3. **Get your Cloudflare credentials:**
   ```bash
   # Get Account ID
   wrangler whoami
   
   # Create API token at: https://dash.cloudflare.com/profile/api-tokens
   # Use "Custom token" with "Cloudflare Workers:Edit" permissions
   ```

4. **Configure custom domains:**
   - Add `grounds.gg` and `www.grounds.gg` to your Cloudflare account
   - Ensure DNS is managed by Cloudflare
   - The Worker will automatically handle both domains

5. **Push to main branch** - The workflow will automatically deploy to Cloudflare Workers

## Manual Deployment
```bash
npm run deploy
```
