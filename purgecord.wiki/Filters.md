# Filters

For when you don't want to delete everything, but target specific things.

## Text (Search)

Only messages containing this text get deleted. Just type it in.

## has: link / has: file

Check the box and only messages with links or with attachments get caught.

## Include pinned

By default Purgecord leaves pinned messages alone. If you want those gone too, check the box.

## Pattern (Regex)

For those who want precision. A regular expression goes in here and only messages that match get deleted. Runs case-insensitive.

Example: `^lol$` only deletes messages that are exactly "lol".

If your regex is broken it gets ignored instead of everything blowing up, you'll see a warning in the log.