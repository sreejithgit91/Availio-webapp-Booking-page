# Vercel Deployment Guide

## Important: Vercel Project Settings

Since the application is in the `booking-app/` subdirectory, you need to configure the **Root Directory** in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **General**
3. Under **Root Directory**, set it to: `booking-app`
4. Click **Save**

## Alternative: If Root Directory setting doesn't work

The `vercel.json` in the root is configured to:
- Install dependencies in `booking-app/`
- Build from `booking-app/`
- Serve files from `booking-app/dist/`

## After pushing to GitHub

1. Vercel should automatically detect the new commit
2. It will trigger a new deployment
3. If it doesn't auto-deploy, go to your Vercel dashboard and click **Redeploy**

## Verification

After deployment, your app should be accessible at:
- `https://your-project-name.vercel.app`

The 404 error should be resolved once:
- The Root Directory is set to `booking-app` in Vercel settings, OR
- The vercel.json configuration is properly applied

## Troubleshooting

If you still see 404:
1. Check Vercel build logs to ensure the build completed successfully
2. Verify that `booking-app/dist/index.html` exists after build
3. Make sure the Root Directory is set correctly
4. Check that all routes are being rewritten to `index.html` (SPA routing)

