// ==UserScript==
// @name            Purgecord
// @description     Delete all your messages in a Discord channel or DM (Bulk-Delete) - updated for current Discord builds
// @version         5.3.1
// @author          Zora
// @homepageURL     https://github.com/Zorakidd/Purgecord
// @supportURL      https://github.com/Zorakidd/Purgecord/issues
// @namespace       https://github.com/Zorakidd/Purgecord
// @match           https://*.discord.com/app
// @match           https://*.discord.com/channels/*
// @match           https://*.discord.com/login
// @license         MIT
// @icon            https://victornpb.github.io/undiscord/images/icon128.png
// @downloadURL     https://github.com/Zorakidd/Purgecord/master/purgecord.user.js
// @contributionURL https://ko-fi.com/zora_kidd
// @grant           none
// @attribution     Based on victornpb (https://github.com/victornpb/purgecord), MIT-License

// ==/UserScript==
(function () {
  "use strict";

  /* rollup-plugin-baked-env */
  const VERSION = "5.3.1-zora";

  var themeCss = `
/* purgecord window */
#purgecord.browser { box-shadow: var(--shadow-border), var(--shadow-high); border: 1px solid var(--border-subtle); overflow: hidden; }
#purgecord.container,
#purgecord .container { background-color: var(--background-surface-high); border-radius: 8px; box-sizing: border-box; cursor: default; flex-direction: column; }
#purgecord .header { background-color: var(--background-tertiary); height: 48px; align-items: center; min-height: 48px; padding: 0 16px; display: flex; color: var(--header-secondary); cursor: grab; }
#purgecord .header .icon { color: var(--interactive-normal); margin-right: 8px; flex-shrink: 0; width: 24; height: 24; }
#purgecord .header .icon:hover { color: var(--interactive-hover); }
#purgecord .header h3 { font-size: 16px; line-height: 20px; font-weight: 500; font-family: var(--font-display); color: var(--header-primary); flex-shrink: 0; margin-right: 16px; }
#purgecord .spacer { flex-grow: 1; }
#purgecord .header .vert-divider { width: 1px; height: 24px; background-color: var(--background-modifier-accent); margin-right: 16px; flex-shrink: 0; }
#purgecord legend,
#purgecord label { color: var(--header-secondary); font-size: 12px; line-height: 16px; font-weight: 500; text-transform: uppercase; cursor: default; font-family: var(--font-display); margin-bottom: 8px; }
#purgecord .multiInput { display: flex; align-items: center; font-size: 16px; box-sizing: border-box; width: 100%; border-radius: 3px; color: var(--text-default); background-color: var(--input-background); border: none; transition: border-color 0.2s ease-in-out 0s; }
#purgecord .multiInput :first-child { flex-grow: 1; }
#purgecord .multiInput button:last-child { margin-right: 4px; }
#purgecord .input { font-size: 16px; width: 100%; transition: border-color 0.2s ease-in-out 0s; padding: 10px; height: 44px; background-color: var(--input-background); border: 1px solid var(--input-border); border-radius: 8px; box-sizing: border-box; color: var(--text-default); }
#purgecord fieldset { margin-top: 16px; }
#purgecord .input-wrapper { display: flex; align-items: center; font-size: 16px; box-sizing: border-box; width: 100%; border-radius: 3px; color: var(--text-default); background-color: var(--input-background); border: none; transition: border-color 0.2s ease-in-out 0s; }
#purgecord input[type="text"],
#purgecord input[type="search"],
#purgecord input[type="password"],
#purgecord input[type="datetime-local"],
#purgecord input[type="number"],
#purgecord input[type="range"] { background-color: var(--input-background); border: 1px solid var(--input-border); border-radius: 8px; box-sizing: border-box; color: var(--text-default); font-size: 16px; height: 44px; padding: 12px 10px; transition: border-color .2s ease-in-out; width: 100%; }
#purgecord .divider,
#purgecord hr { border: none; margin-bottom: 24px; padding-bottom: 4px; border-bottom: 1px solid var(--background-modifier-accent); }
#purgecord .sectionDescription { margin-bottom: 16px; color: var(--header-secondary); font-size: 14px; line-height: 20px; font-weight: 400; }
#purgecord a { color: var(--text-link); text-decoration: none; }
#purgecord .btn,
#purgecord button { position: relative; display: flex; -webkit-box-pack: center; justify-content: center; -webkit-box-align: center; align-items: center; box-sizing: border-box; background: none; border: none; border-radius: 3px; font-size: 14px; font-weight: 500; line-height: 16px; padding: 2px 16px; user-select: none; /* sizeSmall */     width: 60px; height: 32px; min-width: 60px; min-height: 32px; /* lookFilled colorPrimary */     color: rgb(255, 255, 255); background-color: var(--button-secondary-background); }
#purgecord .sizeMedium { width: 96px; height: 38px; min-width: 96px; min-height: 38px; }
#purgecord .sizeMedium.icon { width: 38px; min-width: 38px; }
#purgecord sup { vertical-align: top; }
/* lookFilled colorPrimary */
#purgecord .accent { background-color: var(--brand-experiment); }
#purgecord .danger { background-color: var(--button-danger-background); }
#purgecord .positive { background-color: var(--button-positive-background); }
#purgecord .info { font-size: 12px; line-height: 16px; padding: 8px 10px; color: var(--text-muted); }
/* Scrollbar */
#purgecord .scroll::-webkit-scrollbar { width: 8px; height: 8px; }
#purgecord .scroll::-webkit-scrollbar-corner { background-color: transparent; }
#purgecord .scroll::-webkit-scrollbar-thumb { background-clip: padding-box; border: 2px solid transparent; border-radius: 4px; background-color: var(--scrollbar-thin-thumb); min-height: 40px; }
#purgecord .scroll::-webkit-scrollbar-track { border-color: var(--scrollbar-thin-track); background-color: var(--scrollbar-thin-track); border: 2px solid var(--scrollbar-thin-track); }
/* fade scrollbar */
#purgecord .scroll::-webkit-scrollbar-thumb,
#purgecord .scroll::-webkit-scrollbar-track { visibility: hidden; }
#purgecord .scroll:hover::-webkit-scrollbar-thumb,
#purgecord .scroll:hover::-webkit-scrollbar-track { visibility: visible; }
/**** functional classes ****/
#purgecord.redact .priv { display: none !important; }
#purgecord.redact x:not(:active) { color: transparent !important; background-color: var(--primary-700) !important; cursor: default; user-select: none; }
#purgecord.redact x:hover { position: relative; }
#purgecord.redact x:hover::after { content: "Redacted information (Streamer mode: ON)"; position: absolute; display: inline-block; top: -32px; left: -20px; padding: 4px; width: 150px; font-size: 8pt; text-align: center; white-space: pre-wrap; background-color: var(--background-floating); -webkit-box-shadow: var(--elevation-high); box-shadow: var(--elevation-high); color: var(--text-default); border-radius: 5px; pointer-events: none; }
#purgecord.redact [priv] { -webkit-text-security: disc !important; }
#purgecord :disabled { display: none; }
/**** layout and utility classes ****/
#purgecord,
#purgecord * { box-sizing: border-box; }
#purgecord .col { display: flex; flex-direction: column; }
#purgecord .row { display: flex; flex-direction: row; align-items: center; }
#purgecord .mb1 { margin-bottom: 8px; }
#purgecord .log { margin-bottom: 0.25em; }
#purgecord .log-debug { color: inherit; }
#purgecord .log-info { color: #00b0f4; }
#purgecord .log-verb { color: #72767d; }
#purgecord .log-warn { color: #faa61a; }
#purgecord .log-error { color: #f04747; }
#purgecord .log-success { color: #43b581; }
`;

  var mainCss = `
/**** Purgecord Button ****/
#purgecord-btn { position: relative; width: auto; height: 24px; margin: 0 8px; cursor: pointer; color: var(--interactive-normal); flex: 0 0 auto; }
#purgecord-btn progress { position: absolute; top: 23px; left: -4px; width: 32px; height: 12px; display: none; }
#purgecord-btn.running { color: var(--button-danger-background) !important; }
#purgecord-btn.running progress { display: block; }
/**** Purgecord Interface ****/
#purgecord { position: fixed; z-index: 100; top: 58px; right: 10px; display: flex; flex-direction: column; width: 800px; height: 80vh; min-width: 610px; max-width: 100vw; min-height: 448px; max-height: 100vh; color: var(--text-normal); border-radius: 4px; background-color: var(--background-secondary); box-shadow: var(--elevation-stroke), var(--elevation-high); will-change: top, left, width, height; }
#purgecord .header .icon { cursor: pointer; }
#purgecord .window-body { height: calc(100% - 48px); }
#purgecord .sidebar { overflow: hidden scroll; overflow-y: auto; width: 270px; min-width: 250px; height: 100%; max-height: 100%; padding: 8px; background: var(--bg-overlay-4, var(--background-base-lowest)); }
#purgecord .sidebar legend,
#purgecord .sidebar label { display: block; width: 100%; }
#purgecord .main { display: flex; max-width: calc(100% - 250px); background-color: var(--bg-overlay-chat, var(--background-base-lower)); flex-grow: 1; }
#purgecord.hide-sidebar .sidebar { display: none; }
#purgecord.hide-sidebar .main { max-width: 100%; }
#purgecord #logArea { font-family: Consolas, Liberation Mono, Menlo, Courier, monospace; font-size: 0.75rem; overflow: auto; padding: 10px; user-select: text; flex-grow: 1; flex-grow: 1; cursor: auto; }
#purgecord .tbar { padding: 8px; background-color: var(--bg-overlay-2, var(--__header-bar-background)); }
#purgecord .tbar button { margin-right: 4px; margin-bottom: 4px; }
#purgecord .footer { cursor: se-resize; padding-right: 30px; }
#purgecord .footer #progressPercent { padding: 0 1em; font-size: small; color: var(--interactive-muted); flex-grow: 1; }
.resize-handle { position: absolute; bottom: -15px; right: -15px; width: 30px; height: 30px; transform: rotate(-45deg); background: repeating-linear-gradient(0, var(--background-modifier-accent), var(--background-modifier-accent) 1px, transparent 2px, transparent 4px); cursor: nwse-resize; }
/**** Elements ****/
#purgecord summary { font-size: 16px; font-weight: 500; line-height: 20px; position: relative; overflow: hidden; margin-bottom: 2px; padding: 6px 10px; cursor: pointer; white-space: nowrap; text-overflow: ellipsis; color: var(--interactive-normal); border-radius: 4px; flex-shrink: 0; }
#purgecord fieldset { padding-left: 8px; }
#purgecord legend a { float: right; text-transform: initial; }
#purgecord progress { height: 8px; margin-top: 4px; flex-grow: 1; }
#purgecord .importJson { display: flex; flex-direction: row; }
#purgecord .importJson button { margin-left: 5px; width: fit-content; }
`;

  var dragCss = `
[name^="grab-"] { position: absolute; --size: 6px; --corner-size: 16px; --offset: -1px; z-index: 9; }
[name^="grab-"]:hover{ background: rgba(128,128,128,0.1); }
[name="grab-t"] { top: 0px; left: var(--corner-size); right: var(--corner-size); height: var(--size); margin-top: var(--offset); cursor: ns-resize; }
[name="grab-r"] { top: var(--corner-size); bottom: var(--corner-size); right: 0px; width: var(--size); margin-right: var(--offset); 
  cursor: ew-resize; }
[name="grab-b"] { bottom: 0px; left: var(--corner-size); right: var(--corner-size); height: var(--size); margin-bottom: var(--offset); cursor: ns-resize; }
[name="grab-l"] { top: var(--corner-size); bottom: var(--corner-size); left: 0px; width: var(--size); margin-left: var(--offset); cursor: ew-resize; }
[name="grab-tl"] { top: 0px; left: 0px; width: var(--corner-size); height: var(--corner-size); margin-top: var(--offset); margin-left: var(--offset); cursor: nwse-resize; }
[name="grab-tr"] { top: 0px; right: 0px; width: var(--corner-size); height: var(--corner-size); margin-top: var(--offset); margin-right: var(--offset); cursor: nesw-resize; }
[name="grab-br"] { bottom: 0px; right: 0px; width: var(--corner-size); height: var(--corner-size); margin-bottom: var(--offset); margin-right: var(--offset); cursor: nwse-resize; }
[name="grab-bl"] { bottom: 0px; left: 0px; width: var(--corner-size); height: var(--corner-size); margin-bottom: var(--offset); margin-left: var(--offset); cursor: nesw-resize; }
`;

  var buttonHtml = `
<div id="purgecord-btn" tabindex="0" role="button" aria-label="Delete Messages" title="Delete Messages with Purgecord">
    <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
        <path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path>
    </svg>
    <progress></progress>
</div>
`;

  var purgecordTemplate = `
<div id="purgecord" class="browser container redact" style="display:none;">
    <div class="header">
        <svg class="icon" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
            <path fill="currentColor"
                d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z">
            </path>
        </svg>
        <h3>Purgecord</h3>
        <div class="vert-divider"></div>
        <span> Bulk delete messages</span>
        <div class="spacer"></div>
        <div id="hide" class="icon" aria-label="Close" role="button" tabindex="0">
            <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z">
                </path>
            </svg>
        </div>
    </div>
    <div class="window-body" style="display: flex; flex-direction: row;">
        <div class="sidebar scroll">
            <details open>
                <summary>General</summary>
                <fieldset>
                    <legend>
                        Author ID
                        <a href="{{WIKI}}/authorId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="authorId" type="text" priv>
                        </div>
                        <button id="getAuthor">me</button>
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Server ID
                        <a href="{{WIKI}}/guildId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="guildId" type="text" priv>
                        </div>
                        <button id="getGuild">current</button>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        Channel ID
                        <a href="{{WIKI}}/channelId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput mb1">
                        <div class="input-wrapper">
                            <input class="input" id="channelId" type="text" priv>
                        </div>
                        <button id="getChannel">current</button>
                    </div>
                    <div class="sectionDescription">
                        <label class="row"><input id="includeNsfw" type="checkbox">This is a NSFW channel</label>
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Wipe Archive</summary>
                <fieldset>
                    <legend>
                        Import index.json
                        <a href="{{WIKI}}/importJson" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input type="file" id="importJsonInput" accept="application/json,.json" style="width:100%";>
                    </div>
                    <div class="sectionDescription">
                        <br>
                        After requesting your data from discord, you can import it here.<br>
                        Select the "messages/index.json" file from the discord archive.
                    </div>
                </fieldset>
            </details>
            <hr>
            <details>
                <summary>Filter</summary>
                <fieldset>
                    <legend>
                        Search
                        <a href="{{WIKI}}/filters" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="search" type="text" placeholder="Containing text" priv>
                    </div>
                    <div class="sectionDescription">
                        Only delete messages that contain the text
                    </div>
                    <div class="sectionDescription">
                        <label><input id="hasLink" type="checkbox">has: link</label>
                    </div>
                    <div class="sectionDescription">
                        <label><input id="hasFile" type="checkbox">has: file</label>
                    </div>
                    <div class="sectionDescription">
                        <label><input id="includePinned" type="checkbox">Include pinned</label>
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Pattern
                        <a href="{{WIKI}}/pattern" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="sectionDescription">
                        Delete messages that match the regular expression
                    </div>
                    <div class="input-wrapper">
                        <span class="info">/</span>
                        <input id="pattern" type="text" placeholder="regular expression" priv>
                        <span class="info">/</span>
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Messages interval</summary>
                <fieldset>
                    <legend>
                        Interval of messages
                        <a href="{{WIKI}}/messageId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput mb1">
                        <div class="input-wrapper">
                            <input id="minId" type="text" placeholder="After a message" priv>
                        </div>
                        <button id="pickMessageAfter">Pick</button>
                    </div>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input id="maxId" type="text" placeholder="Before a message" priv>
                        </div>
                        <button id="pickMessageBefore">Pick</button>
                    </div>
                    <div class="sectionDescription">
                        Specify an interval to delete messages.
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Date interval</summary>
                <fieldset>
                    <legend>
                        After date
                        <a href="{{WIKI}}/dateRange" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper mb1">
                        <input id="minDate" type="datetime-local" title="Messages posted AFTER this date">
                    </div>
                    <legend>
                        Before date
                        <a href="{{WIKI}}/dateRange" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="maxDate" type="datetime-local" title="Messages posted BEFORE this date">
                    </div>
                    <div class="sectionDescription">
                        Delete messages that were posted between the two dates.
                    </div>
                    <div class="sectionDescription">
                        * Filtering by date doesn't work if you use the "Messages interval".
                    </div>
                </fieldset>
            </details>
            <hr>
            <details>
                <summary>Advanced settings</summary>
                <fieldset>
                    <legend>
                        Search delay
                        <a href="{{WIKI}}/delay" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="searchDelay" type="range" value="30000" step="100" min="100" max="60000">
                        <div id="searchDelayValue"></div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        Delete delay
                        <a href="{{WIKI}}/delay" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="deleteDelay" type="range" value="1000" step="50" min="50" max="10000">
                        <div id="deleteDelayValue"></div>
                    </div>
                    <br>
                    <div class="sectionDescription">
                        This will affect the speed in which the messages are deleted.
                        Use the help link for more information.
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Authorization Token
                        <a href="{{WIKI}}/authToken" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="token" type="text" autocomplete="dont" priv>
                        </div>
                        <button id="getToken">fill</button>
                    </div>
                </fieldset>
            </details>
            <hr>
            <div></div>
            <div class="info">
                Purgecord {{VERSION}}
                <br> Zora
            </div>
        </div>
        <div class="main col">
            <div class="tbar col">
                <div class="row">
                    <button id="toggleSidebar" class="sizeMedium icon">☰</button>
                    <button id="start" class="sizeMedium danger" style="width: 150px;" title="Start the deletion process">▶︎ Delete</button>
                    <button id="stop" class="sizeMedium" title="Stop the deletion process" disabled>🛑 Stop</button>
                    <button id="clear" class="sizeMedium">Clear log</button>
                    <label class="row" title="Hide sensitive information on your screen for taking screenshots">
                        <input id="redact" type="checkbox" checked> Streamer mode
                    </label>
                </div>
                <div class="row">
                    <progress id="progressBar" style="display:none;"></progress>
                </div>
            </div>
            <pre id="logArea" class="logarea scroll">
                <div class="" style="background: var(--background-mentioned); padding: .5em;">Notice: Purgecord may be working slower than usual and<wbr>require multiple attempts due to a recent Discord update.<br>We're working on a fix, and we thank you for your patience.</div>
                <center>
                    <div>Star <a href="{{HOME}}" target="_blank" rel="noopener noreferrer">this project</a> on GitHub!</div>
                    <div><a href="{{HOME}}/discussions" target="_blank" rel="noopener noreferrer">Issues or help</a></div>
                </center>
            </pre>
            <div class="tbar footer row">
                <div id="progressPercent"></div>
                <span class="spacer"></span>
                <label>
                    <input id="autoScroll" type="checkbox" checked> Auto scroll
                </label>
                <div class="resize-handle"></div>
            </div>
        </div>
    </div>
</div>

`;

  const log = {
    debug() {
      return logFn
        ? logFn("debug", arguments)
        : console.debug.apply(console, arguments);
    },
    info() {
      return logFn
        ? logFn("info", arguments)
        : console.info.apply(console, arguments);
    },
    verb() {
      return logFn
        ? logFn("verb", arguments)
        : console.log.apply(console, arguments);
    },
    warn() {
      return logFn
        ? logFn("warn", arguments)
        : console.warn.apply(console, arguments);
    },
    error() {
      return logFn
        ? logFn("error", arguments)
        : console.error.apply(console, arguments);
    },
    success() {
      return logFn
        ? logFn("success", arguments)
        : console.info.apply(console, arguments);
    },
  };

  var logFn; // custom console.log function
  const setLogFn = (fn) => (logFn = fn);

  // Helpers
  const wait = async (ms) =>
    new Promise((done) => setTimeout(done, Math.max(0, Number(ms) || 0)));
  // Adds +/- pct randomness so requests don't fire at a perfectly periodic (bot-like) cadence.
  const jitter = (ms, pct = 0.15) => {
    const base = Math.max(0, Number(ms) || 0);
    return base + (Math.random() * 2 - 1) * base * pct;
  };
  const msToHMS = (s) =>
    `${(s / 3.6e6) | 0}h ${((s % 3.6e6) / 6e4) | 0}m ${((s % 6e4) / 1000) | 0}s`;
  const escapeHTML = (html) =>
    String(html).replace(
      /[&<"']/g,
      (m) => ({ "&": "&amp;", "<": "&lt;", '"': "&quot;", "'": "&#039;" })[m],
    );
  const redact = (str) => `<x>${escapeHTML(str)}</x>`;
  const queryString = (params) =>
    params
      .filter((p) => p[1] !== undefined)
      .map((p) => p[0] + "=" + encodeURIComponent(p[1]))
      .join("&");
  const ask = async (msg) =>
    new Promise((resolve) =>
      setTimeout(() => resolve(window.confirm(msg)), 10),
    );
  const toSnowflake = (date) =>
    /:/.test(date)
      ? (new Date(date).getTime() - 1420070400000) * Math.pow(2, 22)
      : date;
  const replaceInterpolations = (str, obj, removeMissing = false) =>
    str.replace(
      /\{\{([\w_]+)\}\}/g,
      (m, key) => obj[key] || (removeMissing ? "" : m),
    );

  const PREFIX$1 = "[PURGECORD]";

  /**
   * Delete all messages in a Discord channel or DM
   * @author Zora <https://www.github.com/zorakidd>
   * @see https://github.com/zorakidd/purgecord
   */
  // API-Basis dynamisch aus Discord lesen, mit Fallback
  function apiBase() {
    try {
      const env = window.GLOBAL_ENV;
      if (env?.API_ENDPOINT && env?.API_VERSION) {
        // API_ENDPOINT ist z.B. "//discord.com/api"
        return `${location.protocol}${env.API_ENDPOINT}/v${env.API_VERSION}`;
      }
    } catch (e) {
      /* fallback */
    }
    return "https://discord.com/api/v9";
  }
  class PurgecordCore {
    options = {
      authToken: null, // Your authorization token
      authorId: null, // Author of the messages you want to delete
      guildId: null, // Server were the messages are located
      channelId: null, // Channel were the messages are located
      minId: null, // Only delete messages after this, leave blank do delete all
      maxId: null, // Only delete messages before this, leave blank do delete all
      content: null, // Filter messages that contains this text content
      hasLink: null, // Filter messages that contains link
      hasFile: null, // Filter messages that contains file
      includeNsfw: null, // Search in NSFW channels
      includePinned: null, // Delete messages that are pinned
      pattern: null, // Only delete messages that match the regex (insensitive)
      searchDelay: null, // Delay each time we fetch for more messages
      deleteDelay: null, // Delay between each delete operation
      maxAttempt: 2, // Attempts to delete a single message if it fails
      askForConfirmation: true,
    };

    state = {
      running: false,
      delCount: 0,
      failCount: 0,
      grandTotal: 0,
      offset: 0,
      iterations: 0,

      _seachResponse: null,
      _messagesToDelete: [],
      _skippedMessages: [],
    };

    stats = {
      startTime: new Date(), // start time
      throttledCount: 0, // how many times you have been throttled
      throttledTotalTime: 0, // the total amount of time you spent being throttled
      lastPing: null, // the most recent ping
      avgPing: null, // average ping used to calculate the estimated remaining time
      etr: 0,
    };

    // events
    onStart = undefined;
    onProgress = undefined;
    onStop = undefined;

    // adaptive pacing (persists across resetState/batch jobs)
    _baselineDelays = null; // floor values delays are allowed to ease back down to
    _searchStreak = 0; // consecutive un-throttled searches
    _deleteStreak = 0; // consecutive un-throttled deletes

    /** Gradually relax a delay back toward its floor after a run of clean
     * (non-throttled) requests, so a single early rate limit doesn't
     * permanently slow down the rest of the session. */
    easeDelay(kind) {
      const key = kind === "search" ? "searchDelay" : "deleteDelay";
      const floor = this._baselineDelays[kind];
      if (this.options[key] > floor) {
        this.options[key] = Math.max(
          floor,
          Math.round(this.options[key] * 0.92),
        );
      }
    }

    /** Read Discord's own rate-limit headers and report how long we must
     * wait before this bucket refills, so we can pace ourselves instead of
     * waiting to get hit with a 429. */
    rateLimitHeaderWait(resp) {
      const remaining = resp.headers.get("x-ratelimit-remaining");
      const resetAfter = resp.headers.get("x-ratelimit-reset-after");
      if (remaining === "0" && resetAfter) {
        const w = Math.ceil(parseFloat(resetAfter) * 1000);
        if (w > 0) return w;
      }
      return 0;
    }

    resetState() {
      this.state = {
        running: false,
        delCount: 0,
        failCount: 0,
        grandTotal: 0,
        offset: 0,
        iterations: 0,

        _seachResponse: null,
        _messagesToDelete: [],
        _skippedMessages: [],
      };

      this.options.askForConfirmation = true;
    }

    /** Automate the deletion process of multiple channels */
    async runBatch(queue) {
      if (this.state.running) return log.error("Already running!");

      log.info(`Runnning batch with queue of ${queue.length} jobs`);
      for (let i = 0; i < queue.length; i++) {
        const job = queue[i];
        log.info("Starting job...", `(${i + 1}/${queue.length})`);

        // set options
        this.options = {
          ...this.options, // keep current options
          ...job, // override with options for that job
        };

        await this.run(true);
        if (!this.state.running) break;

        log.info("Job ended.", `(${i + 1}/${queue.length})`);
        this.resetState();
        this.options.askForConfirmation = false;
        this.state.running = true; // continue running
      }

      log.info("Batch finished.");
      this.state.running = false;
    }

    /** Start the deletion process */
    async run(isJob = false) {
      if (this.state.running && !isJob) return log.error("Already running!");

      this.state.running = true;
      this.stats.startTime = new Date();

      if (!this._baselineDelays) {
        this._baselineDelays = {
          search: this.options.searchDelay,
          delete: this.options.deleteDelay,
        };
      }

      log.success(`\nStarted at ${this.stats.startTime.toLocaleString()}`);
      log.debug(
        `authorId = "${redact(this.options.authorId)}"`,
        `guildId = "${redact(this.options.guildId)}"`,
        `channelId = "${redact(this.options.channelId)}"`,
        `minId = "${redact(this.options.minId)}"`,
        `maxId = "${redact(this.options.maxId)}"`,
        `hasLink = ${!!this.options.hasLink}`,
        `hasFile = ${!!this.options.hasFile}`,
      );

      if (this.onStart) this.onStart(this.state, this.stats);

      do {
        this.state.iterations++;

        log.verb("Fetching messages...");
        // Search messages
        await this.search();

        // Process results and find which messages should be deleted
        await this.filterResponse();

        log.verb(
          `Grand total: ${this.state.grandTotal}`,
          `(Messages in current page: ${this.state._seachResponse.messages.length}`,
          `To be deleted: ${this.state._messagesToDelete.length}`,
          `Skipped: ${this.state._skippedMessages.length})`,
          `offset: ${this.state.offset}`,
        );
        this.printStats();

        // Calculate estimated time
        this.calcEtr();
        log.verb(`Estimated time remaining: ${msToHMS(this.stats.etr)}`);

        // if there are messages to delete, delete them
        if (this.state._messagesToDelete.length > 0) {
          if ((await this.confirm()) === false) {
            this.state.running = false; // break out of a job
            break; // immmediately stop this iteration
          }

          await this.deleteMessagesFromList();
        } else if (this.state._skippedMessages.length > 0) {
          // There are stuff, but nothing to delete (example a page full of system messages)
          // check next page until we see a page with nothing in it (end of results).
          const oldOffset = this.state.offset;
          this.state.offset += this.state._skippedMessages.length;
          log.verb(
            "There's nothing we can delete on this page, checking next page...",
          );
          log.verb(
            `Skipped ${this.state._skippedMessages.length} out of ${this.state._seachResponse.messages.length} in this page.`,
            `(Offset was ${oldOffset}, ajusted to ${this.state.offset})`,
          );
        } else {
          log.verb("Ended because API returned an empty page.");
          log.verb("[End state]", this.state);
          if (isJob) break; // break without stopping if this is part of a job
          this.state.running = false;
        }

        // wait before next page (fix search page not updating fast enough)
        log.verb(
          `Waiting ${(this.options.searchDelay / 1000).toFixed(2)}s before next page...`,
        );
        await wait(jitter(this.options.searchDelay));
      } while (this.state.running);

      this.stats.endTime = new Date();
      log.success(
        `Ended at ${this.stats.endTime.toLocaleString()}! Total time: ${msToHMS(this.stats.endTime.getTime() - this.stats.startTime.getTime())}`,
      );
      this.printStats();
      log.debug(
        `Deleted ${this.state.delCount} messages, ${this.state.failCount} failed.\n`,
      );

      if (this.onStop) this.onStop(this.state, this.stats);
    }

    stop() {
      this.state.running = false;
      if (this.onStop) this.onStop(this.state, this.stats);
    }

    /** Calculate the estimated time remaining based on the current stats */
    calcEtr() {
      this.stats.etr =
        this.options.searchDelay * Math.round(this.state.grandTotal / 25) +
        (this.options.deleteDelay + this.stats.avgPing) * this.state.grandTotal;
    }

    /** As for confirmation in the beggining process */
    async confirm() {
      if (!this.options.askForConfirmation) return true;

      log.verb("Waiting for your confirmation...");
      const preview = this.state._messagesToDelete
        .map(
          (m) =>
            `${m.author.username}#${m.author.discriminator}: ${m.attachments.length ? "[ATTACHMENTS]" : m.content}`,
        )
        .join("\n");

      const answer = await ask(
        `Do you want to delete ~${this.state.grandTotal} messages? (Estimated time: ${msToHMS(this.stats.etr)})` +
          "(The actual number of messages may be less, depending if you're using filters to skip some messages)" +
          "\n\n---- Preview ----\n" +
          preview,
      );

      if (!answer) {
        log.error("Aborted by you!");
        return false;
      } else {
        log.verb("OK");
        this.options.askForConfirmation = false; // do not ask for confirmation again on the next request
        return true;
      }
    }

    async search() {
      let API_SEARCH_URL;
      const BASE = apiBase();
      if (this.options.guildId === "@me")
        API_SEARCH_URL = `${BASE}/channels/${this.options.channelId}/messages/`; // DMs
      else API_SEARCH_URL = `${BASE}/guilds/${this.options.guildId}/messages/`; // Server

      let resp;
      try {
        this.beforeRequest();
        resp = await fetch(
          API_SEARCH_URL +
            "search?" +
            queryString([
              ["author_id", this.options.authorId || undefined],
              [
                "channel_id",
                (this.options.guildId !== "@me"
                  ? this.options.channelId
                  : undefined) || undefined,
              ],
              [
                "min_id",
                this.options.minId
                  ? toSnowflake(this.options.minId)
                  : undefined,
              ],
              [
                "max_id",
                this.options.maxId
                  ? toSnowflake(this.options.maxId)
                  : undefined,
              ],
              ["sort_by", "timestamp"],
              ["sort_order", "desc"],
              ["offset", this.state.offset],
              ["has", this.options.hasLink ? "link" : undefined],
              ["has", this.options.hasFile ? "file" : undefined],
              ["content", this.options.content || undefined],
              ["include_nsfw", this.options.includeNsfw ? true : undefined],
            ]),
          {
            headers: {
              Authorization: this.options.authToken,
            },
          },
        );
        this.afterRequest();
      } catch (err) {
        this.state.running = false;
        log.error("Search request threw an error:", err);
        throw err;
      }
      // not indexed yet
      if (resp.status === 202) {
        this._searchStreak = 0;
        let w = (await resp.json()).retry_after * 1000;
        w = Math.max(w || this.options.searchDelay, 1000); // options statt stats + Floor
        this.stats.throttledCount++;
        this.stats.throttledTotalTime += w;
        log.warn(
          `Channel ist noch nicht indexiert. Warte ${w}ms, damit Discord ihn indexiert ...`,
        );
        await wait(w);
        return await this.search();
      }

      if (!resp.ok) {
        // searching messages too fast
        if (resp.status === 429) {
          this._searchStreak = 0;
          let w = (await resp.json()).retry_after * 1000;
          w = w || this.options.searchDelay;
          this.stats.throttledCount++;
          this.stats.throttledTotalTime += w;
          this.options.searchDelay += w; // options statt stats
          w = this.options.searchDelay;
          log.warn(
            `Rate-Limit bei der Suche! Erhöhe Such-Delay auf ${w}ms ...`,
          );
          this.printStats();
          log.verb(`Abkühlphase ${w * 2}ms vor erneutem Versuch ...`);
          await wait(Math.max(w * 2, 1000));
          return await this.search();
        } else {
          this.state.running = false;
          log.error(
            `Error searching messages, API responded with status ${resp.status}!\n`,
            await resp.json(),
          );
          throw resp;
        }
      }

      // clean response: pace ourselves off Discord's own bucket headers,
      // and let the search delay ease back down after a clean streak.
      const headerWait = this.rateLimitHeaderWait(resp);
      if (headerWait) await wait(headerWait);
      this._searchStreak++;
      if (this._searchStreak % 5 === 0) this.easeDelay("search");

      const data = await resp.json();
      this.state._seachResponse = data;
      console.log(PREFIX$1, "search", data);
      return data;
    }

    async filterResponse() {
      const data = this.state._seachResponse;

      // the search total will decrease as we delete stuff
      const total = data.total_results;
      if (total > this.state.grandTotal) this.state.grandTotal = total;

      // search returns messages near the the actual message, only get the messages we searched for.
      const discoveredMessages = data.messages.map((convo) =>
        convo.find((message) => message.hit === true),
      );

      // we can only delete some types of messages, system messages are not deletable.
      let messagesToDelete = discoveredMessages;
      messagesToDelete = messagesToDelete.filter(
        (msg) => msg.type === 0 || (msg.type >= 6 && msg.type <= 21),
      );
      messagesToDelete = messagesToDelete.filter((msg) =>
        msg.pinned ? this.options.includePinned : true,
      );

      // custom filter of messages
      try {
        const regex = new RegExp(this.options.pattern, "i");
        messagesToDelete = messagesToDelete.filter((msg) =>
          regex.test(msg.content),
        );
      } catch (e) {
        log.warn("Ignoring RegExp because pattern is malformed!", e);
      }

      // create an array containing everything we skipped. (used to calculate offset for next searches)
      const skippedMessages = discoveredMessages.filter(
        (msg) => !messagesToDelete.find((m) => m.id === msg.id),
      );

      this.state._messagesToDelete = messagesToDelete;
      this.state._skippedMessages = skippedMessages;

      console.log(PREFIX$1, "filterResponse", this.state);
    }

    async deleteMessagesFromList() {
      for (let i = 0; i < this.state._messagesToDelete.length; i++) {
        const message = this.state._messagesToDelete[i];
        if (!this.state.running) return log.error("Stopped by you!");

        log.debug(
          // `${((this.state.delCount + 1) / this.state.grandTotal * 100).toFixed(2)}%`,
          `[${this.state.delCount + 1}/${this.state.grandTotal}] ` +
            `<sup>${new Date(message.timestamp).toLocaleString()}</sup> ` +
            `<b>${redact(message.author.username + "#" + message.author.discriminator)}</b>` +
            `: <i>${redact(message.content).replace(/\n/g, "↵")}</i>` +
            (message.attachments.length
              ? redact(JSON.stringify(message.attachments))
              : ""),
          `<sup>{ID:${redact(message.id)}}</sup>`,
        );

        // Delete a single message (with retry)
        let attempt = 0;
        while (attempt < this.options.maxAttempt) {
          const result = await this.deleteMessage(message);

          if (result === "RETRY") {
            attempt++;
            log.verb(
              `Retrying in ${this.options.deleteDelay}ms... (${attempt}/${this.options.maxAttempt})`,
            );
            await wait(this.options.deleteDelay);
          } else break;
        }

        this.calcEtr();
        if (this.onProgress) this.onProgress(this.state, this.stats);

        await wait(jitter(this.options.deleteDelay));
      }
    }

    async deleteMessage(message) {
      const API_DELETE_URL = `${apiBase()}/channels/${message.channel_id}/messages/${message.id}`;
      let resp;
      try {
        this.beforeRequest();
        resp = await fetch(API_DELETE_URL, {
          method: "DELETE",
          headers: {
            Authorization: this.options.authToken,
          },
        });
        this.afterRequest();
      } catch (err) {
        // no response error (e.g. network error)
        log.error("Delete request throwed an error:", err);
        log.verb("Related object:", redact(JSON.stringify(message)));
        this.state.failCount++;
        return "FAILED";
      }

      if (!resp.ok) {
        if (resp.status === 429) {
          // deleting messages too fast
          this._deleteStreak = 0;
          const w = (await resp.json()).retry_after * 1000;
          this.stats.throttledCount++;
          this.stats.throttledTotalTime += w;
          this.options.deleteDelay = w; // increase delay
          log.warn(
            `Being rate limited by the API for ${w}ms! Adjusted delete delay to ${this.options.deleteDelay}ms.`,
          );
          this.printStats();
          log.verb(`Cooling down for ${w * 2}ms before retrying...`);
          await wait(w * 2);
          return "RETRY";
        } else {
          const body = await resp.text();

          try {
            const r = JSON.parse(body);

            if (resp.status === 400 && r.code === 50083) {
              // 400 can happen if the thread is archived (code=50083)
              // in this case we need to "skip" this message from the next search
              // otherwise it will come up again in the next page (and fail to delete again)
              log.warn(
                "Error deleting message (Thread is archived). Will increment offset so we don't search this in the next page...",
              );
              this.state.offset++;
              this.state.failCount++;
              return "FAIL_SKIP"; // Failed but we will skip it next time
            }

            log.error(
              `Error deleting message, API responded with status ${resp.status}!`,
              r,
            );
            log.verb("Related object:", redact(JSON.stringify(message)));
            this.state.failCount++;
            return "FAILED";
          } catch (e) {
            log.error(
              `Fail to parse JSON. API responded with status ${resp.status}!`,
              body,
            );
          }
        }
      }

      // clean delete: pace off the real bucket headers, and ease the
      // delete delay back down after a sustained clean streak.
      const headerWait = this.rateLimitHeaderWait(resp);
      if (headerWait) await wait(headerWait);
      this._deleteStreak++;
      if (this._deleteStreak % 15 === 0) this.easeDelay("delete");

      this.state.delCount++;
      return "OK";
    }

    #beforeTs = 0; // used to calculate latency
    beforeRequest() {
      this.#beforeTs = Date.now();
    }
    afterRequest() {
      this.stats.lastPing = Date.now() - this.#beforeTs;
      this.stats.avgPing =
        this.stats.avgPing > 0
          ? this.stats.avgPing * 0.9 + this.stats.lastPing * 0.1
          : this.stats.lastPing;
    }

    printStats() {
      log.verb(
        `Delete delay: ${this.options.deleteDelay}ms, Search delay: ${this.options.searchDelay}ms`,
        `Last Ping: ${this.stats.lastPing}ms, Average Ping: ${this.stats.avgPing | 0}ms`,
      );
      log.verb(
        `Rate Limited: ${this.stats.throttledCount} times.`,
        `Total time throttled: ${msToHMS(this.stats.throttledTotalTime)}.`,
      );
    }
  }

  const MOVE = 0;
  const RESIZE_T = 1;
  const RESIZE_B = 2;
  const RESIZE_L = 4;
  const RESIZE_R = 8;
  const RESIZE_TL = RESIZE_T + RESIZE_L;
  const RESIZE_TR = RESIZE_T + RESIZE_R;
  const RESIZE_BL = RESIZE_B + RESIZE_L;
  const RESIZE_BR = RESIZE_B + RESIZE_R;

  class DragResize {
    constructor({ elm, moveHandle, options }) {
      this.options = defaultArgs(
        {
          enabledDrag: true,
          enabledResize: true,
          minWidth: 200,
          maxWidth: Infinity,
          minHeight: 100,
          maxHeight: Infinity,
          dragAllowX: true,
          dragAllowY: true,
          resizeAllowX: true,
          resizeAllowY: true,
          draggingClass: "drag",
          useMouseEvents: true,
          useTouchEvents: true,
          createHandlers: true,
        },
        options,
      );
      Object.assign(this, options);
      options = undefined;

      elm.style.position = "fixed";

      this.drag_m = new Draggable(elm, moveHandle, MOVE, this.options);

      if (this.options.createHandlers) {
        this.el_t = createElement("div", { name: "grab-t" }, elm);
        this.drag_t = new Draggable(elm, this.el_t, RESIZE_T, this.options);
        this.el_r = createElement("div", { name: "grab-r" }, elm);
        this.drag_r = new Draggable(elm, this.el_r, RESIZE_R, this.options);
        this.el_b = createElement("div", { name: "grab-b" }, elm);
        this.drag_b = new Draggable(elm, this.el_b, RESIZE_B, this.options);
        this.el_l = createElement("div", { name: "grab-l" }, elm);
        this.drag_l = new Draggable(elm, this.el_l, RESIZE_L, this.options);
        this.el_tl = createElement("div", { name: "grab-tl" }, elm);
        this.drag_tl = new Draggable(elm, this.el_tl, RESIZE_TL, this.options);
        this.el_tr = createElement("div", { name: "grab-tr" }, elm);
        this.drag_tr = new Draggable(elm, this.el_tr, RESIZE_TR, this.options);
        this.el_br = createElement("div", { name: "grab-br" }, elm);
        this.drag_br = new Draggable(elm, this.el_br, RESIZE_BR, this.options);
        this.el_bl = createElement("div", { name: "grab-bl" }, elm);
        this.drag_bl = new Draggable(elm, this.el_bl, RESIZE_BL, this.options);
      }
    }
  }

  class Draggable {
    constructor(targetElm, handleElm, op, options) {
      Object.assign(this, options);
      options = undefined;

      this._targetElm = targetElm;
      this._handleElm = handleElm;

      let vw = window.innerWidth;
      let vh = window.innerHeight;
      let initialX, initialY, initialT, initialL, initialW, initialH;

      const clamp = (value, min, max) =>
        value < min ? min : value > max ? max : value;

      const moveOp = (x, y) => {
        const deltaX = x - initialX;
        const deltaY = y - initialY;
        const t = clamp(initialT + deltaY, 0, vh - initialH);
        const l = clamp(initialL + deltaX, 0, vw - initialW);
        this._targetElm.style.top = t + "px";
        this._targetElm.style.left = l + "px";
      };

      const resizeOp = (x, y) => {
        x = clamp(x, 0, vw);
        y = clamp(y, 0, vh);
        const deltaX = x - initialX;
        const deltaY = y - initialY;
        const resizeDirX = op & RESIZE_L ? -1 : 1;
        const resizeDirY = op & RESIZE_T ? -1 : 1;
        const deltaXMax = this.maxWidth - initialW;
        const deltaXMin = this.minWidth - initialW;
        const deltaYMax = this.maxHeight - initialH;
        const deltaYMin = this.minHeight - initialH;
        const t =
          initialT +
          clamp(deltaY * resizeDirY, deltaYMin, deltaYMax) * resizeDirY;
        const l =
          initialL +
          clamp(deltaX * resizeDirX, deltaXMin, deltaXMax) * resizeDirX;
        const w = initialW + clamp(deltaX * resizeDirX, deltaXMin, deltaXMax);
        const h = initialH + clamp(deltaY * resizeDirY, deltaYMin, deltaYMax);
        if (op & RESIZE_T) {
          // resize ↑
          this._targetElm.style.top = t + "px";
          this._targetElm.style.height = h + "px";
        }
        if (op & RESIZE_B) {
          // resize ↓
          this._targetElm.style.height = h + "px";
        }
        if (op & RESIZE_L) {
          // resize ←
          this._targetElm.style.left = l + "px";
          this._targetElm.style.width = w + "px";
        }
        if (op & RESIZE_R) {
          // resize →
          this._targetElm.style.width = w + "px";
        }
      };

      let operation = op === MOVE ? moveOp : resizeOp;

      function dragStartHandler(e) {
        const touch = e.type === "touchstart";
        if (e.buttons === 1 || e.which === 1 || touch) {
          e.preventDefault();
          const x = touch ? e.touches[0].clientX : e.clientX;
          const y = touch ? e.touches[0].clientY : e.clientY;
          initialX = x;
          initialY = y;
          vw = window.innerWidth;
          vh = window.innerHeight;
          initialT = this._targetElm.offsetTop;
          initialL = this._targetElm.offsetLeft;
          initialW = this._targetElm.clientWidth;
          initialH = this._targetElm.clientHeight;
          if (this.useMouseEvents) {
            document.addEventListener("mousemove", this._dragMoveHandler);
            document.addEventListener("mouseup", this._dragEndHandler);
          }
          if (this.useTouchEvents) {
            document.addEventListener("touchmove", this._dragMoveHandler, {
              passive: false,
            });
            document.addEventListener("touchend", this._dragEndHandler);
          }
          this._targetElm.classList.add(this.draggingClass);
        }
      }

      function dragMoveHandler(e) {
        e.preventDefault();
        let x, y;
        const touch = e.type === "touchmove";
        if (touch) {
          const t = e.touches[0];
          x = t.clientX;
          y = t.clientY;
        } else {
          //mouse
          // If the button is not down, dispatch a "fake" mouse up event, to stop listening to mousemove
          // This happens when the mouseup is not captured (outside the browser)
          if ((e.buttons || e.which) !== 1) {
            this._dragEndHandler();
            return;
          }
          x = e.clientX;
          y = e.clientY;
        }
        // perform drag / resize operation
        operation(x, y);
      }

      function dragEndHandler(e) {
        if (this.useMouseEvents) {
          document.removeEventListener("mousemove", this._dragMoveHandler);
          document.removeEventListener("mouseup", this._dragEndHandler);
        }
        if (this.useTouchEvents) {
          document.removeEventListener("touchmove", this._dragMoveHandler);
          document.removeEventListener("touchend", this._dragEndHandler);
        }
        this._targetElm.classList.remove(this.draggingClass);
      }

      // We need to bind the handlers to this instance
      this._dragStartHandler = dragStartHandler.bind(this);
      this._dragMoveHandler = dragMoveHandler.bind(this);
      this._dragEndHandler = dragEndHandler.bind(this);

      this.enable();
    }

    /** Turn on the drag and drop of the instance */
    enable() {
      this.destroy(); // prevent events from getting binded twice
      if (this.useMouseEvents)
        this._handleElm.addEventListener("mousedown", this._dragStartHandler);
      if (this.useTouchEvents)
        this._handleElm.addEventListener("touchstart", this._dragStartHandler, {
          passive: false,
        });
    }

    /** Teardown all events bound to the document and elements. You can resurrect this instance by calling enable() */
    destroy() {
      this._targetElm.classList.remove(this.draggingClass);
      if (this.useMouseEvents) {
        this._handleElm.removeEventListener(
          "mousedown",
          this._dragStartHandler,
        );
        document.removeEventListener("mousemove", this._dragMoveHandler);
        document.removeEventListener("mouseup", this._dragEndHandler);
      }
      if (this.useTouchEvents) {
        this._handleElm.removeEventListener(
          "touchstart",
          this._dragStartHandler,
        );
        document.removeEventListener("touchmove", this._dragMoveHandler);
        document.removeEventListener("touchend", this._dragEndHandler);
      }
    }
  }

  function createElement(tag = "div", attrs, parent) {
    const elm = document.createElement(tag);
    if (attrs)
      Object.entries(attrs).forEach(([k, v]) => elm.setAttribute(k, v));
    if (parent) parent.appendChild(elm);
    return elm;
  }

  function defaultArgs(defaults, options) {
    function isObj(x) {
      return x !== null && typeof x === "object";
    }
    function hasOwn(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    if (isObj(options))
      for (let prop in defaults) {
        if (
          hasOwn(defaults, prop) &&
          hasOwn(options, prop) &&
          options[prop] !== undefined
        ) {
          if (isObj(defaults[prop])) defaultArgs(defaults[prop], options[prop]);
          else defaults[prop] = options[prop];
        }
      }
    return defaults;
  }

  function createElm(html) {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.removeChild(temp.firstElementChild);
  }

  function insertCss(css) {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    return style;
  }

  const messagePickerCss = `
body.purgecord-pick-message [data-list-id="chat-messages"] {
  background-color: var(--background-secondary-alt);
  box-shadow: inset 0 0 0px 2px var(--button-outline-brand-border);
}

body.purgecord-pick-message [id^="message-content-"]:hover {
  cursor: pointer;
  cursor: cell;
  background: var(--background-message-automod-hover);
}
body.purgecord-pick-message [id^="message-content-"]:hover::after {
  position: absolute;
  top: calc(50% - 11px);
  left: 4px;
  z-index: 1;
  width: 65px;
  height: 22px;
  line-height: 22px;
  font-family: var(--font-display);
  background-color: var(--button-secondary-background);
  color: var(--header-secondary);
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  border-radius: 3px;
  content: 'This 👉';
}
body.purgecord-pick-message.before [id^="message-content-"]:hover::after {
  content: 'Before 👆';
}
body.purgecord-pick-message.after [id^="message-content-"]:hover::after {
  content: 'After 👇';
}
`;

  const messagePicker = {
    init() {
      insertCss(messagePickerCss);
    },
    grab(auxiliary) {
      return new Promise((resolve, reject) => {
        document.body.classList.add("purgecord-pick-message");
        if (auxiliary) document.body.classList.add(auxiliary);
        function clickHandler(e) {
          const message = e.target.closest('[id^="message-content-"]');
          if (message) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            if (auxiliary) document.body.classList.remove(auxiliary);
            document.body.classList.remove("purgecord-pick-message");
            document.removeEventListener("click", clickHandler);
            try {
              resolve(message.id.match(/message-content-(\d+)/)[1]);
            } catch (e) {
              resolve(null);
            }
          }
        }
        document.addEventListener("click", clickHandler);
      });
    },
  };
  window.messagePicker = messagePicker;

  function getToken() {
    // 1) schneller iframe-Versuch (klappt bei aktuellem Discord meist nicht mehr, schadet aber nicht)
    try {
      const iframe = document.body.appendChild(
        document.createElement("iframe"),
      );
      const ls = iframe.contentWindow.localStorage;
      iframe.remove();
      if (ls && ls.token) return JSON.parse(ls.token);
    } catch (e) {
      /* weiter */
    }

    // 2) robust: webpack-Modul mit getToken() suchen
    let token;
    try {
      window.webpackChunkdiscord_app.push([
        [Symbol("purgecord")],
        {},
        (req) => {
          for (const mod of Object.values(req.c)) {
            const exp = mod?.exports;
            if (!exp) continue;
            for (const key of ["default", "Z", "ZP", "A"]) {
              if (exp[key] && typeof exp[key].getToken === "function") {
                token = exp[key].getToken();
                return;
              }
            }
            if (typeof exp.getToken === "function") {
              token = exp.getToken();
              return;
            }
          }
        },
      ]);
    } catch (e) {
      log.error("webpack-Token-Suche fehlgeschlagen:", e);
    }
    return token;
  }

  function getAuthorId() {
    const LS = document.body.appendChild(document.createElement("iframe"))
      .contentWindow.localStorage;
    return JSON.parse(LS.user_id_cache);
  }

  function getGuildId() {
    const m = location.href.match(/channels\/([\w@]+)\/(\d+)/);
    if (m) return m[1];
    else
      alert(
        "Could not find the Guild ID!\nPlease make sure you are on a Server or DM.",
      );
  }

  function getChannelId() {
    const m = location.href.match(/channels\/([\w@]+)\/(\d+)/);
    if (m) return m[2];
    else
      alert(
        "Could not find the Channel ID!\nPlease make sure you are on a Channel or DM.",
      );
  }

  function fillToken() {
    try {
      return getToken();
    } catch (err) {
      log.verb(err);
      log.error("Could not automatically detect Authorization Token!");
      log.info("Please make sure Purgecord is up to date");
      log.debug(
        'Alternatively, you can try entering a Token manually in the "Advanced Settings" section.',
      );
    }
    return "";
  }

  const PREFIX = "[PURGECORD]";

  // -------------------------- User interface ------------------------------- //

  // links
  const HOME = "https://github.com/zorakidd/purgecord";
  const WIKI = "https://github.com/zorakidd/purgecord/wiki";

  const purgecordCore = new PurgecordCore();
  messagePicker.init();

  const ui = {
    purgecordWindow: null,
    purgecordBtn: null,
    logArea: null,
    autoScroll: null,

    // progress handler
    progressMain: null,
    progressIcon: null,
    percent: null,
  };
  const $ = (s) => ui.purgecordWindow.querySelector(s);

  function initUI() {
    insertCss(themeCss);
    insertCss(mainCss);
    insertCss(dragCss);
    insertCss(`
	    #purgecord { background-color: var(--background-base-lower, var(--background-secondary, #2b2d31)); color: var(--text-default, var(--text-normal, #dbdee1)); }
	    #purgecord .header { background-color: var(--background-base-lowest, var(--background-tertiary, #1e1f22)); }
	    #purgecord .sidebar { background-color: var(--background-base-low, var(--background-secondary-alt, #2b2d31)); }
	    #purgecord .main { background-color: var(--background-base-lower, var(--background-primary, #313338)); }
	    #purgecord button, #purgecord .btn { color: #fff; background-color: var(--button-secondary-background, #4e5058); }
	    #purgecord .danger { background-color: var(--button-danger-background, #da373c); }
	    #purgecord input, #purgecord .input { color: var(--text-default, #dbdee1); background-color: var(--input-background, rgba(0,0,0,.3)); }
	  `);

    // create purgecord window
    const purgecordUI = replaceInterpolations(purgecordTemplate, {
      VERSION,
      HOME,
      WIKI,
    });
    ui.purgecordWindow = createElm(purgecordUI);
    document.body.appendChild(ui.purgecordWindow);

    // enable drag and resize on purgecord window
    new DragResize({ elm: ui.purgecordWindow, moveHandle: $(".header") });

    // create purgecord Trash icon
    ui.purgecordBtn = createElm(buttonHtml);
    ui.purgecordBtn.onclick = toggleWindow;
    function findToolbarMountPoint() {
      const candidates = [
        () => document.querySelector('[class*="title_"] [class*="toolbar"]'), // Chat-Header-Toolbar
        () => document.querySelector('[class*="toolbar__"]'),
        () => document.querySelector('[class*="toolbar"]'),
      ];
      for (const find of candidates) {
        const el = find();
        if (el) return el;
      }
      return null;
    }

    function mountBtn() {
      if (!ui.purgecordBtn) return;

      const mountPoint = findToolbarMountPoint();

      if (mountPoint) {
        if (!mountPoint.contains(ui.purgecordBtn)) {
          mountPoint.appendChild(ui.purgecordBtn);
        }

        ui.purgecordBtn.style.position = "";
        ui.purgecordBtn.style.top = "";
        ui.purgecordBtn.style.right = "";
        ui.purgecordBtn.style.zIndex = "";
        ui.purgecordBtn.style.background = "";
        ui.purgecordBtn.style.padding = "";
        ui.purgecordBtn.style.borderRadius = "";
      } else {
        if (!document.body.contains(ui.purgecordBtn)) {
          document.body.appendChild(ui.purgecordBtn);
        }

        ui.purgecordBtn.style.position = "fixed";
        ui.purgecordBtn.style.top = "16px";
        ui.purgecordBtn.style.right = "16px";
        ui.purgecordBtn.style.zIndex = "999999";
        ui.purgecordBtn.style.background =
          "var(--background-secondary, #2b2d31)";
        ui.purgecordBtn.style.padding = "8px";
        ui.purgecordBtn.style.borderRadius = "8px";
      }
    }

    mountBtn();

    const discordElm = document.querySelector("#app-mount") || document.body;
    let observerThrottle = null;

    const observer = new MutationObserver(() => {
      if (observerThrottle) return;

      observerThrottle = setTimeout(() => {
        observerThrottle = null;
        mountBtn();
      }, 1000);
    });

    observer.observe(discordElm, {
      attributes: false,
      childList: true,
      subtree: true,
    });

    function toggleWindow() {
      if (ui.purgecordWindow.style.display !== "none") {
        ui.purgecordWindow.style.display = "none";
        ui.purgecordBtn.style.color = "var(--interactive-normal)";
      } else {
        ui.purgecordWindow.style.display = "";
        ui.purgecordBtn.style.color = "var(--interactive-active)";
      }
    }

    // cached elements
    ui.logArea = $("#logArea");
    ui.autoScroll = $("#autoScroll");
    ui.progressMain = $("#progressBar");
    ui.progressIcon = ui.purgecordBtn.querySelector("progress");
    ui.percent = $("#progressPercent");

    // register event listeners
    $("#hide").onclick = toggleWindow;
    $("#toggleSidebar").onclick = () =>
      ui.purgecordWindow.classList.toggle("hide-sidebar");
    $("button#start").onclick = startAction;
    $("button#stop").onclick = stopAction;
    $("button#clear").onclick = () => (ui.logArea.innerHTML = "");
    $("button#getAuthor").onclick = () =>
      ($("input#authorId").value = getAuthorId());
    $("button#getGuild").onclick = () => {
      const guildId = ($("input#guildId").value = getGuildId());
      if (guildId === "@me") $("input#channelId").value = getChannelId();
    };
    $("button#getChannel").onclick = () => {
      $("input#channelId").value = getChannelId();
      $("input#guildId").value = getGuildId();
    };
    $("#redact").onchange = () => {
      const b = ui.purgecordWindow.classList.toggle("redact");
      if (b)
        alert(
          "This mode will attempt to hide personal information, so you can screen share / take screenshots.\nAlways double check you are not sharing sensitive information!",
        );
    };
    $("#pickMessageAfter").onclick = async () => {
      alert(
        "Select a message on the chat.\nThe message below it will be deleted.",
      );
      toggleWindow();
      const id = await messagePicker.grab("after");
      if (id) $("input#minId").value = id;
      toggleWindow();
    };
    $("#pickMessageBefore").onclick = async () => {
      alert(
        "Select a message on the chat.\nThe message above it will be deleted.",
      );
      toggleWindow();
      const id = await messagePicker.grab("before");
      if (id) $("input#maxId").value = id;
      toggleWindow();
    };
    $("button#getToken").onclick = () => ($("input#token").value = fillToken());

    // sync delays
    $("input#searchDelay").onchange = (e) => {
      const v = parseInt(e.target.value);
      if (v) purgecordCore.options.searchDelay = v;
    };
    $("input#deleteDelay").onchange = (e) => {
      const v = parseInt(e.target.value);
      if (v) purgecordCore.options.deleteDelay = v;
    };

    $("input#searchDelay").addEventListener("input", (event) => {
      $("div#searchDelayValue").textContent = event.target.value + "ms";
    });
    $("input#deleteDelay").addEventListener("input", (event) => {
      $("div#deleteDelayValue").textContent = event.target.value + "ms";
    });

    // import json
    const fileSelection = $("input#importJsonInput");
    fileSelection.onchange = async () => {
      const files = fileSelection.files;

      // No files added
      if (files.length === 0) return log.warn("No file selected.");

      // Get channel id field to set it later
      const channelIdField = $("input#channelId");

      // Force the guild id to be ourself (@me)
      const guildIdField = $("input#guildId");
      guildIdField.value = "@me";

      // Set author id in case its not set already
      $("input#authorId").value = getAuthorId();
      try {
        const file = files[0];
        const text = await file.text();
        const json = JSON.parse(text);
        const channelIds = Object.keys(json);
        channelIdField.value = channelIds.join(",");
        log.info(`Loaded ${channelIds.length} channels.`);
      } catch (err) {
        log.error("Error parsing file!", err);
      }
    };

    // redirect console logs to inside the window after setting up the UI
    setLogFn(printLog);

    setupPurgecordCore();
  }

  function printLog(type = "", args) {
    ui.logArea.insertAdjacentHTML(
      "beforeend",
      `<div class="log log-${type}">${Array.from(args)
        .map((o) =>
          typeof o === "object"
            ? JSON.stringify(
                o,
                o instanceof Error && Object.getOwnPropertyNames(o),
              )
            : o,
        )
        .join("\t")}</div>`,
    );
    if (ui.autoScroll.checked)
      ui.logArea.querySelector("div:last-child").scrollIntoView(false);
    if (type === "error") console.error(PREFIX, ...Array.from(args));
  }

  function setupPurgecordCore() {
    purgecordCore.onStart = (state, stats) => {
      console.log(PREFIX, "onStart", state, stats);
      $("#start").disabled = true;
      $("#stop").disabled = false;

      ui.purgecordBtn.classList.add("running");
      ui.progressMain.style.display = "block";
      ui.percent.style.display = "block";
    };

    purgecordCore.onProgress = (state, stats) => {
      // console.log(PREFIX, 'onProgress', state, stats);
      let max = state.grandTotal;
      const value = state.delCount + state.failCount;
      max = Math.max(max, value, 0); // clamp max

      // status bar
      const percent =
        value >= 0 && max ? Math.round((value / max) * 100) + "%" : "";
      const elapsed = msToHMS(Date.now() - stats.startTime.getTime());
      const remaining = msToHMS(stats.etr);
      ui.percent.innerHTML = `${percent} (${value}/${max}) Elapsed: ${elapsed} Remaining: ${remaining}`;

      ui.progressIcon.value = value;
      ui.progressMain.value = value;

      // indeterminate progress bar
      if (max) {
        ui.progressIcon.setAttribute("max", max);
        ui.progressMain.setAttribute("max", max);
      } else {
        ui.progressIcon.removeAttribute("value");
        ui.progressMain.removeAttribute("value");
        ui.percent.innerHTML = "...";
      }

      // update delays
      const searchDelayInput = $("input#searchDelay");
      searchDelayInput.value = purgecordCore.options.searchDelay;
      $("div#searchDelayValue").textContent =
        purgecordCore.options.searchDelay + "ms";

      const deleteDelayInput = $("input#deleteDelay");
      deleteDelayInput.value = purgecordCore.options.deleteDelay;
      $("div#deleteDelayValue").textContent =
        purgecordCore.options.deleteDelay + "ms";
    };

    purgecordCore.onStop = (state, stats) => {
      console.log(PREFIX, "onStop", state, stats);
      $("#start").disabled = false;
      $("#stop").disabled = true;
      ui.purgecordBtn.classList.remove("running");
      ui.progressMain.style.display = "none";
      ui.percent.style.display = "none";
    };
  }

  async function startAction() {
    console.log(PREFIX, "startAction");
    // general
    const authorId = $("input#authorId").value.trim();
    const guildId = $("input#guildId").value.trim();
    const channelIds = $("input#channelId")
      .value.trim()
      .split(/\s*,\s*/);
    const includeNsfw = $("input#includeNsfw").checked;
    // filter
    const content = $("input#search").value.trim();
    const hasLink = $("input#hasLink").checked;
    const hasFile = $("input#hasFile").checked;
    const includePinned = $("input#includePinned").checked;
    const pattern = $("input#pattern").value;
    // message interval
    const minId = $("input#minId").value.trim();
    const maxId = $("input#maxId").value.trim();
    // date range
    const minDate = $("input#minDate").value.trim();
    const maxDate = $("input#maxDate").value.trim();
    //advanced
    const searchDelay = parseInt($("input#searchDelay").value.trim());
    const deleteDelay = parseInt($("input#deleteDelay").value.trim());

    // token
    const authToken = $("input#token").value.trim() || fillToken();
    if (!authToken) return; // get token already logs an error.

    // validate input
    if (!guildId) return log.error('You must fill the "Server ID" field!');

    // clear logArea
    ui.logArea.innerHTML = "";

    purgecordCore.resetState();
    purgecordCore.options = {
      ...purgecordCore.options,
      authToken,
      authorId,
      guildId,
      channelId: channelIds.length === 1 ? channelIds[0] : undefined, // single or multiple channel
      minId: minId || minDate,
      maxId: maxId || maxDate,
      content,
      hasLink,
      hasFile,
      includeNsfw,
      includePinned,
      pattern,
      searchDelay,
      deleteDelay,
      // maxAttempt: 2,
    };
    if (channelIds.length > 1) {
      const jobs = channelIds.map((ch) => ({
        guildId: guildId,
        channelId: ch,
      }));

      try {
        await purgecordCore.runBatch(jobs);
      } catch (err) {
        log.error("CoreException", err);
      }
    }
    // single channel
    else {
      try {
        await purgecordCore.run();
      } catch (err) {
        log.error("CoreException", err);
        purgecordCore.stop();
      }
    }
  }

  function stopAction() {
    console.log(PREFIX, "stopAction");
    purgecordCore.stop();
  }

  // ---- END Purgecord ----

  initUI();
})();
