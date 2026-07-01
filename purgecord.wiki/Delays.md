# Delays

Two sliders under Advanced Settings, both in milliseconds.

## Search delay

How long Purgecord waits between two search requests. Discord indexes search slowly, so it needs a pause here.

## Delete delay

How long it waits between two deletions.

## What to set

The defaults are a good starting point. If you keep seeing "Rate Limited" in the log, turn the delays up. Slower is more annoying but safer and stands out less.

Purgecord also adjusts the delete delay automatically when Discord throttles you, so you don't have to keep tweaking it.