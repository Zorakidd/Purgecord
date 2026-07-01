# Purgecord

Bulk-delete your own Discord messages. In servers, in DMs, in group chats. A userscript that runs in your browser, no app, no sketchy program you have to install.

Originally a fork of [Undiscord](https://github.com/victornpb/undiscord), but reworked because the original stopped working properly on current Discord builds (rate-limit bug, outdated selectors, broken token grab).

## What it does

* Delete all your own messages in a channel or DM
* Filter by text (only messages containing "xyz")
* Filter by regex when you need to be precise
* Filter by date (only between two points in time)
* Filter by message ID (only from/up to a specific message)
* Delete only messages with links or files
* Skip pinned messages or include them
* Set delays so you don't constantly hit the rate limit
* Batch through multiple channels one after another
* Import your Discord data archive and delete through it

## Heads up, let's be honest for a second

This automates actions on your account. Discord calls that a self-bot and per their ToS it's not allowed. Worst case, your account gets terminated. I built the tool to run with reasonable delays so it doesn't stick out more than it has to, but there's always some residual risk.

Use at your own risk. That call is yours to make.

## Installation

1. You need a userscript extension in your browser:
   * **Chrome / Brave / Edge / Opera:** [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/)
   * **Firefox:** [Tampermonkey](https://www.tampermonkey.net/), [Violentmonkey](https://violentmonkey.github.io/) or [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/)

2. Open [`purgecord.user.js`](./purgecord.user.js) and click "Raw" at the top. Your extension will catch it and ask if you want to install. Click yes.

3. Open [Discord](https://discord.com/channels/@me) **in your browser** (not the desktop app) and go to the channel or DM you want wiped.

4. Click the 🗑️ icon that's now in the top right corner.

5. Click the buttons next to **Author ID**, **Server ID** and **Channel ID**, that fills them in automatically.

6. Hit Delete. Done.

If something won't start, check the [Wiki](../../wiki), most of it is covered there in detail.

## Auth token, this part matters

Never share your auth token. Anywhere. Whoever has your token has full access to your account, no password, no 2FA prompt. There are bots crawling the internet looking for these.

If you accidentally posted your token somewhere: log out immediately in the **same browser**, that invalidates the token. Then change your password so you get logged out everywhere. And if you don't have it on already, turn on [2FA](https://support.discord.com/hc/en-us/articles/219576828).

Don't post screenshots or logs online if you're unsure whether your token might be on them.

## Security

You're running someone else's code on your account here. You should only do that if you trust the code. The full source is right here in this repo, read it yourself or have it read before you run it. As a rule, never run code you don't trust.

## Contributing

Bugs, ideas, improvements are welcome. Take a quick look at [CONTRIBUTING.md](./CONTRIBUTING.md) first.

## License

MIT. See [LICENSE](./LICENSE). Based on Undiscord by Victor Nascimento (victornpb), also MIT.

## Disclaimer

This software is provided "as is", without warranty of any kind. The author is not liable for damages, account terminations, or any other consequences arising from its use. By using it, you accept that.

---

If this actually saved you some hassle and you feel like it, you can buy me a coffee. No pressure, but it's appreciated.

[☕ Ko-fi.com/zora_kidd](https://ko-fi.com/zora_kidd)