# Fix Vercel 404 Error - Step by Step

## The Problem
Vercel is returning 404 because it can't find the built files. This happens when the Root Directory is not set correctly.

## SOLUTION: Set Root Directory in Vercel Dashboard

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Login to your account
3. Find and click on your project: **Availio-webapp-Booking-page**

### Step 2: Set Root Directory
1. Click on **Settings** tab (top navigation)
2. Scroll down to **General** section
3. Find **Root Directory** field
4. Click **Edit** button
5. Enter: `booking-app`
6. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **three dots** (⋯) menu
4. Click **Redeploy**
5. Confirm the redeploy

### Step 4: Wait and Test
1. Wait 1-2 minutes for deployment to complete
2. Check the deployment logs for any errors
3. Visit your app URL again
4. The 404 should be gone!

## Alternative: If Root Directory Setting Doesn't Exist

If you don't see the Root Directory option:

1. **Disconnect and Reconnect the Repository:**
   - Go to Settings → Git
   - Disconnect the repository
   - Reconnect it
   - When reconnecting, make sure to set:
     - **Root Directory:** `booking-app`
     - **Framework Preset:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`

2. **Or create a new project:**
   - Create a new Vercel project
   - Connect the same GitHub repository
   - During setup, set Root Directory to `booking-app`

## Verification

After setting Root Directory and redeploying:
- ✅ Build logs should show: "Building from booking-app/"
- ✅ Build should complete successfully
- ✅ Deployment should show "Ready"
- ✅ Your app should load without 404

## Still Having Issues?

Check the build logs in Vercel:
1. Go to Deployments
2. Click on the latest deployment
3. Check the Build Logs tab
4. Look for errors like:
   - "Cannot find module"
   - "Build failed"
   - "No output directory found"

If you see errors, share them and we can fix them.

