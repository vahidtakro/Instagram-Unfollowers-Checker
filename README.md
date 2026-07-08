# Instagram Unfollowers Checker

A simple Node.js script that compares your Instagram followers vs following list to find who isn't following you back. No API key required — works with Instagram's official data export.

## Output

- `not_following_back.json` — list of users who don't follow back (sorted newest first)
- `not_following_back.html` — same list as a clean, browsable HTML page

## How to Get Your Data from Instagram

1. Open the Instagram app or go to **instagram.com** on desktop.
2. Go to **Your profile** → **Settings and activity** (gear icon) → **Your activity** → **Download your information**.
3. Click **Download or transfer information** → select your account.
4. Choose **Some of your information** → scroll and check **Followers and following**.
5. Select **Download to device** as the destination.
6. Choose **Date range**: **All time** and **Format**: **JSON**.
7. Click **Create files**. Instagram will email you when the download is ready (can take a few minutes).
8. Download the ZIP file and extract it.
9. Inside the extracted folder, go to: `followers_and_following/`
10. Copy these files into this project folder:
   - `followers_1.json` (and any `followers_2.json`, `followers_3.json`, etc.)
   - `following.json`

## How to Run

1. **Install Node.js** if you don't have it: https://nodejs.org
2. Place the data files from Instagram into this folder (see steps above).
3. Run the script:

```bash
node check_unfollowers.js
```

4. Open `not_following_back.html` in your browser to see the results.

## File Structure

| File | Purpose |
|---|---|
| `check_unfollowers.js` | The main script |
| `followers_*.json` | Your followers data (from Instagram) |
| `following.json` | Who you follow (from Instagram) |
| `not_following_back.json` | Generated output — people not following back |
| `not_following_back.html` | Generated output — browsable report |
| `README.md` | This file |

## License

MIT © 2026 — feel free to use, modify, and share.

---

If you found this useful, please ⭐ star the repo on GitHub — it helps a lot!
