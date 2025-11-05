# Vercel Deployment - Quick Fix

## Option 1: Set Root Directory in Vercel (RECOMMENDED)

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **General**
4. Scroll to **Root Directory**
5. Set it to: `booking-app`
6. Click **Save**
7. Go to **Deployments** tab
8. Click **Redeploy** on the latest deployment

This is the easiest solution and will make Vercel treat `booking-app` as the project root.

## Option 2: If Root Directory doesn't work

The `vercel.json` in the root is configured to:
- Build from `booking-app/` directory
- Output to `booking-app/dist/`
- Serve all routes through `index.html`

After pushing changes, Vercel should automatically redeploy. If not, manually trigger a redeploy.

## Verify Build

After deployment, check the build logs in Vercel to ensure:
- ✅ Build completed successfully
- ✅ Files are in `booking-app/dist/`
- ✅ `index.html` exists in the output

## Test the Deployment

Once deployed, your app should be accessible at:
- `https://your-project-name.vercel.app`

If you still see 404, check:
1. Build logs for any errors
2. That the Root Directory is set correctly
3. That the dist folder contains the built files

