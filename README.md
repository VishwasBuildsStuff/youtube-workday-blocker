# YouTube Blocker

YouTube Blocker is a lightweight Chrome extension that helps you stay focused by redirecting YouTube pages to a simple focus screen during working hours or whenever you turn on its manual block.

## What it does

- **Scheduled blocking:** Blocks YouTube from **10:00 AM to 5:00 PM**, based on the browser's local time.
- **Manual blocking:** Lets you turn blocking on or off from the extension popup at any time.
- **Recognizes YouTube domains:** Checks URLs containing `youtube.com`, `music.youtube.com`, or `youtu.be`.
- **Focus screen:** Replaces blocked pages with an in-extension page reminding you to focus.
- **Blocking counter:** Stores a count of blocking events and displays an approximate time-saved estimate in the popup (15 minutes per counted event).

## How it works

The extension uses a Manifest V3 background service worker to check tabs as they load or change URL. It also creates a one-minute alarm that checks open tabs while scheduled or manual blocking is active. When a matching YouTube URL is found during an active block, the tab is redirected to `blocked.html` and the stored counter is incremented.

The popup reads and updates the manual-block setting in Chrome's local extension storage. The scheduled window uses JavaScript's local `Date` and `getHours()`, so it follows the computer's local time zone.

## Install in Chrome

This project does not include a packaged store release. To load the source as an unpacked extension:

1. Download or clone this repository.
2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode**.
4. Select **Load unpacked** and choose the project folder containing `manifest.json`.
5. Pin **YouTube Blocker** from the Extensions menu if you want quick access to its popup.

## Use

- During the 10 AM–5 PM local-time window, matching YouTube pages are redirected to the focus screen automatically.
- Outside that window, open the extension popup and select **Block YouTube Now** to enable the manual block.
- Select **Turn OFF Manual Block** to disable the manual setting. The scheduled window remains active regardless of that setting.

## Project files

| File | Purpose |
| --- | --- |
| `manifest.json` | Declares the extension name, version, permissions, service worker, and popup. |
| `service.js` | Checks YouTube tabs, applies the schedule/manual setting, and updates the blocking counter. |
| `popup.html` | Defines the extension popup and its controls. |
| `popup.js` | Reads status and counter data and handles the manual toggle. |
| `blocked.html` | Displays the focus screen shown in redirected tabs. |

## Permissions

The manifest requests:

- `storage` to retain the manual-block setting and blocking counter locally.
- `tabs` to inspect open tabs and redirect matching YouTube tabs.
- `alarms` to periodically check tabs while blocking is active.

## Notes

- Blocking applies when a matching tab loads or its URL changes, and during the periodic open-tab check while a block is active.
- Turning off the manual block does not navigate an already redirected tab back to its previous YouTube page; navigate there again when you are ready.
- The popup's saved-time figure is an estimate: it multiplies the stored block count by 15 minutes. It is not a measured browsing-time total.
- The schedule is fixed in the source at 10:00–17:00; there are no schedule controls in the popup.

## GitHub repository description

**Suggested short description:**

> A lightweight Chrome extension that blocks YouTube during 10 AM–5 PM work hours or on demand, with a simple focus screen and estimated time-saved counter.
