/* Playlist proxy will be configured after the Cloudflare Worker is deployed and tested.
   Expected response: {"tracks":[{"title":"...","artist":"...","artwork":"https://...","url":"https://..."}]}
   Tracks must be returned in SoundCloud playlist order. */
window.EXHAIL_CONFIG={playlistProxy:""};
