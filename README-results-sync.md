# Sending ILIMNI results to a Google Sheet

Results now sync automatically:
- **On every mission completion** — a summary row (student, mission, XP, completion %, accuracy %).
- **On every manual Export click** — the same, plus the full text report in one cell.

Local progress (localStorage) and the downloadable `.txt` export are unchanged — this is additive, and fails silently if unset or offline, so the app still works without it.

## One-time setup (5 minutes)

1. **Create a Google Sheet** (any name, e.g. "ILIMNI Results").
2. In the Sheet, go to **Extensions → Apps Script**.
3. Delete the boilerplate `Code.gs` content and paste in the contents of `Code.gs` from this folder.
4. Click **Deploy → New deployment**.
   - Click the gear icon next to "Select type" → choose **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone (this lets the static page POST to it without a Google login; the URL itself is the secret — don't publish it)
   - Click **Deploy**, then **Authorize access** and approve the permissions (it only needs to edit this one spreadsheet).
5. Copy the **Web app URL** it gives you (ends in `/exec`).
6. Open `app.js` and find this line near the top:
   ```js
   var RESULTS_WEBHOOK_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
   Replace the placeholder with the URL you copied.
7. Redeploy/host `app.js` as usual. Done — a `Results` tab will appear in your Sheet the first time a student finishes a mission.

## Updating the script later

If you ever edit `Code.gs` again, you must **Deploy → Manage deployments → Edit → New version** — saving the file alone does not update the live web app URL's behavior.

## Notes

- Because Apps Script doesn't return CORS headers, the request is sent with `mode: "no-cors"`, so the browser can't read the response — but the row still gets written. If you want to verify it's working, just check the Sheet after a test run.
- If you'd rather not expose an "Anyone can access" endpoint, an alternative is Google Forms (each field maps to a form entry ID) — say the word if you'd like that version instead.
- To turn syncing off again, just restore the placeholder value in `RESULTS_WEBHOOK_URL`.
