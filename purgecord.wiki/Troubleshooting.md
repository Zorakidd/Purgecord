# Troubleshooting

## The 🗑️ button isn't there

* Are you in the browser and not the desktop app? Has to be the browser.
* Reload the page once.
* Is the script active in Tampermonkey/Violentmonkey? Quickly check it's enabled.
* Chrome sometimes gets fussy with Manifest V3. Try Brave or Firefox.

## It deletes nothing / hangs

* Check the log in the panel. Does it say "Rate Limited"? Turn the [Delays](Delays) up.
* Does it say something about the token? Then enter the [Auth Token](Auth-Token) by hand.

## "This channel isn't indexed yet"

That's normal. Discord has to make the channel searchable first. Purgecord waits automatically and keeps trying. Just let it run.

## It stops partway through

Could be a rate limit that hit too hard. Turn delays up, start again. Purgecord picks up where messages are left.

## Still broken

Open an [issue](../../issues) with what's in the log (cut the token out first) and which browser you're on.