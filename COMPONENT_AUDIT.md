# MDX Component Audit

Audit of all 37 blog posts for MDX component retrofit opportunities.

---

### TerminalBlock

- **2019-12-18-raspberrypi-vnc-with-macos-screen-sharing.mdx** — 7 bash blocks: error message, `sudo raspi-config`, `sudo reboot`, `sudo vncpasswd -service`, VncAuth config, `systemctl restart`, `ifconfig`
- **2020-01-29-virtualenv-env-variables.mdx** — Jekyll-style `{% highlight bash %}` blocks for export/unset env var commands
- **2020-01-31-jetbrains-mono-in-vscode.mdx** — bash block showing settings.json file path
- **2020-03-26-slack-status-webhooks.mdx** — zsh block showing StatusHook webhook URL
- **2021-07-22-python-virtual-envs-with-mkvirtualenv.mdx** — Multiple Jekyll-style `{% highlight bash %}` blocks and one fenced bash block for `mkvirtualenv`, `rmvirtualenv`, `lsvirtualenv`, brew install, pip install, shell config exports
- **2022-02-19-scp-with-zsh.mdx** — 2 bash blocks: scp with escaped wildcard, scp without escaped wildcard
- **2022-03-09-helium-heartbeats-part-2.mdx** — 4 bash blocks: `mkvirtualenv`, postactivate script, predeactivate script, `workon`, `pip install`
- **2024-05-01-download-twitter-spaces-replay.mdx** — bash blocks: `brew install ffmpeg yt-dlp`, `cd ~/Downloads`, `yt-dlp` download command
- **2026-02-14-make-it-forkable.mdx** — bash block: `python3 apply-theme.py`; plus prompt blocks already using prompt language
- **2026-02-19-whos-actually-clicking.mdx** — bash block: curl command querying Cloudflare Analytics Engine SQL API
- **2026-02-20-taming-logo-svgs-at-scale.mdx** — bash blocks: SVG fill variant generation script, output listing of trimmed viewBoxes
- **2026-03-19-research-backed-flaky-test-skill.mdx** — bash blocks: `npx skills add trunk-io/trunk-skills`, `git clone` + `cp -r` install commands
- **2026-03-20-coffee-week-fork.mdx** — bash block: Google Maps search URL example

### Callout

- **2019-12-16-installing-drive-in-tool-free-case.mdx** — "Give the Case with the installer Hard Drive a gentle shake... Do not attach foam to the Hard Drive directly" (variant: **tip**); "The drive may need to be initialized before it will be recognized by your system" (variant: **note**)
- **2020-03-26-slack-status-webhooks.mdx** — "UPDATE March 27, 2020 - So this only works for meetings you are hosting..." (variant: **warning**)
- **2021-07-22-python-virtual-envs-with-mkvirtualenv.mdx** — "These steps are copy/pasted from this stackoverflow Post... so that I can find them quickly" (variant: **note**); "Restart your terminal." (variant: **warning**)
- **2021-08-14-helium-hotspot-setup-outdoor.mdx** — "I assume no responsibility... BE SAFE, falling off of roofs... can be fatal" (variant: **warning**); "Quick Note on POE connections..." (variant: **note**)
- **2021-12-05-helium-hotspot-setup-indoor-options.mdx** — "A fast, stable internet connection provides the best performance" (variant: **tip**); "In a year this equates to roughly $5 or less" (variant: **note**); "IT IS INCREDIBLY IMPORTANT THAT YOU NEVER POWER ON THE HOTSPOT WITHOUT THE ANTENNA PROPERLY CONNECTED" (variant: **warning**)
- **2022-03-08-helium-heartbeats-part-1.mdx** — "these are not my actual hotspots, they are associated to a wallet I selected at random" (variant: **note**); "A change in status is when a Hotspot has been inactive for more than a specified number of Blocks" (variant: **note**)
- **2022-03-09-helium-heartbeats-part-2.mdx** — "Quick Check! Run `printenv | grep WALLET` to ensure your environment variables are set correctly!" (variant: **tip**)
- **2022-03-10-helium-heartbeats-part-3.mdx** — "Make note of how frequently you are checking..." (variant: **note**); "This function is long, please see the file in the Github repo for all of the details" (variant: **note**)
- **2022-03-11-helium-heartbeats-part-4.mdx** — "To match my setup, you will need to purchase the Pushover App..." (variant: **note**)
- **2024-05-01-download-twitter-spaces-replay.mdx** — Blockquote plug for Pieces app (variant: **tip**)
- **2026-02-05-claude-cover.mdx** — Multiple "Lesson:" paragraphs (variant: **tip**); "Gotcha #1/2/3" paragraphs (variant: **gotcha**)
- **2026-02-10-let-claude-cook-burgers.mdx** — "You can fork the repo..." blockquote (variant: **tip**)
- **2026-02-14-make-it-forkable.mdx** — "Taco week, ramen week, pizza week..." blockquote (variant: **note**)
- **2026-02-18-shipping-before-the-datas-ready.mdx** — `?year=2026` URL parameter for testing (variant: **tip**)
- **2026-02-19-whos-actually-clicking.mdx** — `sendBeacon` silent CORS failure story (variant: **gotcha**)
- **2026-02-20-taming-logo-svgs-at-scale.mdx** — SVGs with `<g transform>` attributes breaking the bounding box script (variant: **gotcha**)
- **2026-03-13-predicting-room-temperatures-with-home-assistant.mdx** — HVAC features didn't rank in top 5 due to limited data (variant: **note**); missing sensor graceful fallback (variant: **tip**)
- **2026-03-13-smart-shade-blueprints-for-home-assistant.mdx** — "Lessons Learned" bold-prefixed paragraphs (variant: **tip**)
- **2026-03-20-before-and-aifter.mdx** — "Actually test this on a real GitHub profile" caveat (variant: **warning**)
- **2026-03-20-uber-skills-livestream-breakdown.mdx** — "A poorly written skill doesn't throw an error. It silently degrades" (variant: **warning**); "We don't want to operate purely on vibes" (variant: **note**)

### StepList

- **2019-06-04-python-safeway-clipper.mdx** — 5-step numbered approach: parse args, init webdriver, log in, clip coupons, savings
- **2019-12-16-installing-drive-in-tool-free-case.mdx** — 7-step hardware assembly procedure (Steps 1-7, each as H2 headings)
- **2019-12-18-raspberrypi-vnc-with-macos-screen-sharing.mdx** — 7-step VNC setup procedure (Steps 1-7, each as H3 headings)
- **2020-03-26-slack-status-webhooks.mdx** — Multi-step procedure: add emoji, install StatusHook, generate POST URLs, create Siri Shortcuts, Zoom webhook setup
- **2021-07-22-python-virtual-envs-with-mkvirtualenv.mdx** — Configuration steps: install brew, Python, virtualenv, set up variables, restart terminal
- **2021-08-14-helium-hotspot-setup-outdoor.mdx** — Multi-step outdoor assembly: enclosure, mounting plate, antenna, power, mounting, POE, installation
- **2021-11-18-fix-elgato-wavelink-zoom-crashes.mdx** — 4-step removal procedure: delete app, remove audio driver, restart coreaudiod, done
- **2022-03-09-helium-heartbeats-part-2.mdx** — 4-step setup: virtual environment, env variables, install requirements, set headers
- **2024-05-01-download-twitter-spaces-replay.mdx** — Prerequisites (install yt-dlp, ffmpeg, get link) then Chrome DevTools walkthrough
- **2026-02-14-make-it-forkable.mdx** — 5-step apply-theme.py workflow; 3-step fork workflow
- **2026-02-20-eve-of-burger-week-features.mdx** — 4-step numbered workflow: plan, branch/implement feature 1, branch/implement feature 2, push/merge/deploy
- **2026-03-13-predicting-room-temperatures-with-home-assistant.mdx** — 7-step model training pipeline; retrain.sh steps

### TIL

- **2020-01-29-virtualenv-env-variables.mdx** — Scoping env vars inside virtualenvs using postactivate/predeactivate hooks
- **2021-07-25-google-calendar-sync-fixes.mdx** — The hidden Google Calendar Sync Selection page fixes sync issues
- **2021-11-08-pandas-timezone-aware-conversion.mdx** — How to convert timezone-aware strings to datetime objects in pandas
- **2021-11-18-fix-elgato-wavelink-zoom-crashes.mdx** — "Turns out, to use a Wave Mic with Zoom on macOS you do not need WaveLink"
- **2022-02-19-scp-with-zsh.mdx** — In zsh, you must escape wildcard characters in scp commands
- **2024-04-09-vscode-mdx-config.mdx** — Adding `"*.mdx": "markdown"` to VSCode settings makes markdown extensions work on MDX files
- **2026-02-05-claude-cover.mdx** — 5 key takeaways: start simple, build debug tools, test against real systems, transparency > accuracy, disagreement is a feature
- **2026-02-10-let-claude-cook-burgers.mdx** — The barrier is activation energy, not technical skill
- **2026-02-17-the-latest-travel-charger-audit.mdx** — Battery bank as a charging hub; tedious problems are worth formalizing
- **2026-02-19-whos-actually-clicking.mdx** — `sendBeacon` silently fails cross-origin with wrong content type — no console error
- **2026-02-20-taming-logo-svgs-at-scale.mdx** — Regex SVG processing is fragile; use proper SVG parsing and `resvg` at scale
- **2026-03-13-predicting-room-temperatures-with-home-assistant.mdx** — Coefficient analysis reveals physically intuitive behavior (south room tracks solar, office is self-predictive)
- **2026-03-19-research-backed-flaky-test-skill.mdx** — "Only flag what you can reliably detect from code" — 8 things well > 15 things badly
- **2026-03-20-coffee-week-fork.mdx** — Hardcoded values only surface when you actually fork — the real test of "config-driven"
- **2026-03-20-uber-skills-livestream-breakdown.mdx** — Tribal knowledge encoded as skills is the killer use case, not clever automations

### PartsList

- **2019-12-16-installing-drive-in-tool-free-case.mdx** — ORICO 2.5" USB3.0 enclosure + Seagate FireCuda 2TB SSHD (with links)
- **2021-08-14-helium-hotspot-setup-outdoor.mdx** — Outdoor Enclosure Kit contents (12 items: PVC tape, waterproof tape, antenna cable, enclosure, lid, mounting plate, etc.); Extra Tools (4 items: 10mm socket, screwdriver, level, ladder)
- **2026-02-17-the-latest-travel-charger-audit.mdx** — Two tables: power sources (67W wall block, 45W wall block, Anker battery bank) and cables (USB-C to USB-C, USB-C to Lightning, Apple Watch cable), each with Amazon links and purpose
- **2026-03-13-predicting-room-temperatures-with-home-assistant.mdx** — Sensor inventory: Zigbee sensors, Ecobee thermostats, Ecowitt weather station, Enphase Envoy, office mini-split

### GitHubCard

- **2019-06-04-python-safeway-clipper.mdx** — `samgutentag/safewayClipper`
- **2022-03-08-helium-heartbeats-part-1.mdx** — `samgutentag/helium-heartbeat`
- **2022-03-09-helium-heartbeats-part-2.mdx** — `samgutentag/helium-heartbeat`
- **2022-03-10-helium-heartbeats-part-3.mdx** — `samgutentag/helium-heartbeat`
- **2022-03-11-helium-heartbeats-part-4.mdx** — `samgutentag/helium-heartbeat`
- **2025-08-01-home-to-vscode.mdx** — `samgutentag/meal-plan-vscode` and `samgutentag/meal-plan-cursor`
- **2026-02-05-claude-cover.mdx** — `samgutentag/cloud-cover`
- **2026-02-10-let-claude-cook-burgers.mdx** — `samgutentag/sbburgerweek`
- **2026-02-14-make-it-forkable.mdx** — `samgutentag/sbburgerweek`
- **2026-02-18-shipping-before-the-datas-ready.mdx** — `samgutentag/sbburgerweek`
- **2026-02-19-whos-actually-clicking.mdx** — `samgutentag/sbburgerweek`
- **2026-02-20-eve-of-burger-week-features.mdx** — `samgutentag/sbburgerweek`
- **2026-03-19-research-backed-flaky-test-skill.mdx** — `trunk-io/trunk-skills`
