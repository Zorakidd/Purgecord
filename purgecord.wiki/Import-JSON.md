# JSON Import

For wiping your entire message history across all your DMs and channels, not just one.

## How it works

1. Request your data archive from Discord (Settings → Data & Privacy → Request all of my Data). This takes a while, Discord emails you when it's ready.
2. Once you have the archive, find the file `messages/index.json` inside it.
3. In Purgecord, open the **Wipe Archive** section and import that file.
4. It loads all your channels from the archive. Hit Delete and it works through them.

This is the heavy option. It can take a long time depending on how much history you have, so set your [Delays](Delays) sensibly and let it run.