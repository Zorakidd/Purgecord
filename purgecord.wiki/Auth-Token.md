# Auth Token

Normally you don't have to deal with this at all, Purgecord grabs the token automatically when you hit **Delete**.

## When the automatic grab fails

Discord occasionally changes how the token is hidden internally. When that happens you have to enter it by hand once:

1. Press F12, open the **Network** tab
2. Do something in Discord, like switching channels
3. Click any request in the list
4. On the right, under **Headers**, find the `Authorization` line
5. Copy the value
6. Paste it into the token field under **Advanced Settings** in Purgecord

## And now the important part

The token is your master key. It bypasses 2FA too. Don't give it to anyone, don't post it anywhere, no screenshot, no log, nothing.

If it slips out: log out in the same browser (invalidates it), change your password, done.